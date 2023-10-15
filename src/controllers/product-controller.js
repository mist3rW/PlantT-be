const prisma = require("../models/prisma");
const createError = require("../utils/create-error");
const { upload } = require("../utils/cloudinary-service");
const cloudinary = require("../config/cloudinary");

exports.uploadProductImage = async (req, res, next) => {
  try {
    if (!req.files || !req.body.productId) {
      return next(createError("File or productId Not Found", 400));
    }
    const { path } = req.files.image_url[0];
    const imageURL = await upload(path);
    const productId = req.body.productId;
    const productImage = await prisma.Product_image.create({
      data: {
        image_url: imageURL,
        productId: productId,
      },
    });
    res
      .status(201)
      .json({ message: "Image uploaded successfully!", productImage });
  } catch (err) {
    console.error(err);
    console.log(err);
    next(err);
  }
};

exports.addProduct = async (req, res, next) => {
  try {
    const { name, price, SKU, brand, stock, desc, categoryId, menu_order } =
      req.body;

    const product = await prisma.product.create({
      data: {
        name,
        price,
        SKU,
        brand,
        stock,
        desc,
        menu_order,
        Product_category: {
          create: {
            category: {
              connect: {
                id: categoryId,
              },
            },
          },
        },
      },
    });

    res.status(201).json({ message: "Product Added Successfully!", product });
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
