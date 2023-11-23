const prisma = require("../models/prisma");
const createError = require("../utils/create-error");

exports.getAllOrders = async (req, res, next) => {
  try {
    const allOrders = await prisma.Order.findMany({
      include: {
        shipping_address: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    res.status(200).json(allOrders);
  } catch (error) {
    console.error("Could not get order data: ", error);
    next(createError("Could not get order data", 500));
  }
};

exports.getSingleOrder = async (req, res, next) => {
  try {
    console.log(req.params);
    const { orderId } = req.params;
    console.log("Received orderId:", orderId);
    const getOrder = await prisma.Order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        Order_items: {
          include: {
            product: {
              select: {
                name: true,
                price: true,
                brand: true,
                stock: true,
                desc: true,
                isFeatured: true,
              },
            },
          },
        },
        Confirm_payment: {
          select: {
            slip_img_url: true,
          },
        },
        shipping_address: {
          select: {
            phone: true,
            firstName: true,
            lastName: true,
            street_address: true,
            sub_district: true,
            district: true,
            province: true,
            zip: true,
          },
        },
        payment_method: {
          select: {
            name: true,
          },
        },
        shipping_method: {
          select: {
            name: true,
          },
        },
        user: {
          select: {
            email_address: true,
            mobile: true,
            firstName: true,
            lastName: true,
            role: true,
          },
        },
      },
    });
    if (!getOrder) {
      console.log("Order not found");
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(getOrder);
  } catch (error) {
    console.error("Could not get order data: ", error);
    next(createError("Could not get order data", 500));
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { orderId, newStatus } = req.body;
    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        order_status: newStatus,
      },
    });
    res.status(201).json({ message: "Updated order status successfully!" });
  } catch (error) {
    console.error("Could not update order status: ", error);
    next(createError("Could not update order status", 500));
  }
};

// exports.getOrderStatus = async (req, res, next) => {
//   try {

//   } catch (err) {
//     console.error("Could not get order status: ", error);
//     next(createError("Could not get order status", 500));
//   }
// };
