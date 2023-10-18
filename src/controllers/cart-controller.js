const prisma = require("../models/prisma");
const createError = require("../utils/create-error");

exports.addToCart = async (req, res, next) => {
  try {
    const { productId, qty, userId } = req.body;
    const existingProduct = await prisma.cart_items.findFirst({
      where: {
        productId,
        userId,
      },
    });
    if (existingProduct) {
      await prisma.cart_items.update({
        data: {
          qty: {
            increment: qty,
          },
        },
        where: {
          id: existingProduct.id,
        },
      });
      return res.status(201).json({ message: "update qty successfully!" });
    }
    const product = await prisma.cart_items.create({
      data: {
        productId,
        qty,
        userId,
      },
    });
    res
      .status(201)
      .json({ message: "Product Added to Cart Successfully!", product });
  } catch (err) {
    next(err);
  }
};

exports.updateQty = async (req, res, next) => {
  try {
    const { cartItemId, newQty } = req.params;
    await prisma.cart_items.updateMany({
      where: {
        productId: cartItemId,
      },
      data: {
        qty: parseInt(newQty) || 1,
      },
    });
    res.status(201).json({ message: "Update product quantity successfully!" });
  } catch (err) {
    console.error("error updating qty: ", err);
    next(err);
  }
};

exports.deleteFromCart = async (req, res, next) => {
  try {
    const { cartItemId } = req.params;

    await prisma.cart_items.deleteMany({
      where: {
        productId: cartItemId,
      },
    });
    res.status(200).json({
      message: "Cart Item has been deleted successfully!",
    });
  } catch (error) {
    console.error("Error deleting cart items:", error);
    next(error);
  }
};

exports.getCartItems = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const getCartItems = await prisma.cart_items.findMany({
      where: {
        userId: userId,
      },
      include: {
        product: {
          select: {
            name: true,
            price: true,
            Product_image: {
              select: {
                image_url: true,
              },
            },
          },
        },
      },
    });
    res.status(200).json(getCartItems);
  } catch (err) {
    console.log("Error reading cart items");
    console.error(err);
    next(createError("Cart could not be read", 500));
  }
};

exports.finishCart = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

exports.clearUserCart = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const userCartItems = await prisma.cart_items.findMany({
      where: {
        userId,
      },
    });
    await prisma.cart_items.deleteMany({
      where: {
        userId,
      },
    });
    res.status(200).json({
      message: "User's cart has been cleared succesfully!",
    });
  } catch (error) {
    console.error("Error clearing user's cart:", error);
  }
};
