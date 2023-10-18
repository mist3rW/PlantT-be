const prisma = require("../models/prisma");
const createError = require("../utils/create-error");
const { clearUserCart } = require("../controllers/cart-controller");

exports.getPaymentMethod = async (req, res, next) => {
  try {
    const paymentMethods = await prisma.Payment_method.findMany();
    res.status(200).json(paymentMethods);
  } catch (error) {
    console.error("Could not get payment method data: ", error);
    next(createError("Payment method could not be read", 500));
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

    res.status(201).json({ message: "New Order Added Successfully!" });
  } catch (error) {
    console.error("Could not create order data: ", error);
    next(createError("Order could not be created", 500));
  }
};
