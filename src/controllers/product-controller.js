const prisma = require("../models/prisma");
const createError = require("../utils/create-error");

exports.addProduct = async (req, res, next) => {
  try {
    const { name, price, SKU, brand, stock, desc } = req.body;
    const product = await prisma.product.create({
      data: {
        name,
        price,
        SKU,
        brand,
        stock,
        desc,
      },
    });

    res.status(201).json({ message: "Product Added Successfully!" });
  } catch (err) {
    next(err);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const allProduct = await prisma.product.findMany();
    res.status(200).json(allProduct);
  } catch (err) {
    next(err);
  }
};
