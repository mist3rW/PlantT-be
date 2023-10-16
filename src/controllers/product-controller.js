const prisma = require("../models/prisma");
const createError = require("../utils/create-error");
const { upload } = require("../utils/cloudinary-service");
const cloudinary = require("../config/cloudinary");

// exports.uploadProductImage = async (req, res, next) => {
//   try {
//     if (!req.files || !req.body.productId) {
//       return next(createError("File or productId Not Found", 400));
//     }
//     const { path } = req.files.image_url[0];
//     const imageURL = await upload(path);
//     const productId = req.body.productId;
//     const productImage = await prisma.Product_image.create({
//       data: {
//         image_url: imageURL,
//         productId: productId,
//       },
//     });
//     res
//       .status(201)
//       .json({ message: "Image uploaded successfully!", productImage });
//   } catch (err) {
//     console.error(err);
//     console.log(err);
//     next(err);
//   }
// };

exports.addProduct = async (req, res, next) => {
  try {
    const { name, price, SKU, brand, stock, desc, categoryId, menu_order } =
      JSON.parse(req.body.productInfo);

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

    if (!req.file) {
      return next(createError("File Not Found", 400));
    }
    const { path } = req.file;
    const imageURL = await upload(path);
    const productImage = await prisma.Product_image.create({
      data: {
        image_url: imageURL,
        productId: product.id,
      },
    });

    res.status(201).json({ message: "Product Added Successfully!", product });
  } catch (err) {
    next(err);
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const allProduct = await prisma.product.findMany({
      include: {
        Product_category: {
          select: {
            category: {
              select: {
                name: true,
              },
            },
          },
        },
        Product_image: {
          select: {
            image_url: true,
          },
        },
      },
    });
    res.status(200).json(allProduct);
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const targetProductId = req.params.id;

    await prisma.product_category.deleteMany({
      where: {
        productId: targetProductId,
      },
    });

    await prisma.product_image.deleteMany({
      where: {
        productId: targetProductId,
      },
    });

    await prisma.product.delete({
      where: {
        id: targetProductId,
      },
    });

    res.status(200).json({
      message: "Product has been deleted successfully!",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    next(error);
  }
};
