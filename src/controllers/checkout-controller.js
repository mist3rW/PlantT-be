const prisma = require("../models/prisma");
const createError = require("../utils/create-error");
const { clearUserCart } = require("../controllers/cart-controller");
const { upload } = require("../utils/cloudinary-service");

exports.getPaymentMethod = async (req, res, next) => {
  try {
    const paymentMethods = await prisma.Payment_method.findMany();
    res.status(200).json(paymentMethods);
  } catch (error) {
    console.error("Could not get payment method data: ", error);
    next(createError("Payment method could not be read", 500));
  }
};

exports.getBankDetails = async (req, res, next) => {
  try {
    const bankDetails = await prisma.bank_account.findMany();
    res.status(200).json(bankDetails);
  } catch (error) {
    console.error("Could not get bank account data: ", error);
    next(createError("bank account could not be read", 500));
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    const {
      email,
      phone,
      firstName,
      lastName,
      street_address,
      sub_district,
      district,
      province,
      zip,
      payment_methodId,
      shipping_methodId,
      userId,
      cart,
      total_amount,
    } = req.body;

    const newOrderAddress = await prisma.Shipping_address.create({
      data: {
        email,
        phone,
        firstName,
        lastName,
        street_address,
        sub_district,
        district,
        province,
        zip,
        userId,
      },
    });

    const createNewOrder = await prisma.Order.create({
      data: {
        payment_methodId,
        userId,
        shipping_addressId: newOrderAddress.id,
        shipping_methodId: String(shipping_methodId),
        total_amount,
        order_status: "PENDING",
      },
    });

    for (const cartItem of cart) {
      await prisma.Order_items.create({
        data: {
          orderId: createNewOrder.id,
          productId: cartItem.productId,
          qty: cartItem.qty,
          price: cartItem.product.price,
        },
      });
    }

    // const userCartItems = await prisma.cart_items.findMany({
    //   where: {
    //     userId,
    //   },
    // });

    await prisma.cart_items.deleteMany({
      where: {
        userId,
      },
    });

    console.log(createNewOrder);

    res.status(201).json({
      message: "New Order Added Successfully!",
      orderId: createNewOrder.id,
    });
  } catch (error) {
    console.error("Could not create order data: ", error);
    next(createError("Order could not be created", 500));
  }
};

exports.addConfirmPayment = async (req, res, next) => {
  try {
    const { phone, bank_accountId, orderId } = JSON.parse(req.body.formInfo);
    console.log(bank_accountId);
    if (!req.file) {
      return next(createError("File Not Found", 400));
    }
    const { path } = req.file;
    const imageURL = await upload(path);
    const confirmPaymentData = await prisma.confirm_payment.create({
      data: {
        phone,
        slip_img_url: imageURL,
        orderId,
        bank_accountId,
      },
    });
    res.status(201).json({
      message: "New confirm payment has been added!",
      confirmPaymentData,
    });
  } catch (error) {
    console.error("Could not create confirm payment data: ", error);
    next(createError("confirm payment could not be created", 500));
  }
};
