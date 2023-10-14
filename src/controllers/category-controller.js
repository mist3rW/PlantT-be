const prisma = require("../models/prisma");
const createError = require("../utils/create-error");

exports.getCategories = async (req, res, next) => {
  try {
    const getCategoryName = await prisma.category.findMany();
    res.status(200).json(getCategoryName);
  } catch (err) {
    console.log("Error reading categories");
    console.error(err);
    next(createError("Categories could not be read", 500));
  }
};

exports.addCategories = async (req, res, next) => {
  try {
    const { name } = req.body;
    const newCategory = await prisma.category.create({
      data: {
        name,
      },
    });
    res.status(201).json({ message: "Categories created successfully" });
  } catch (err) {
    console.log("Error creating categories");
    console.error(err);
    next(createError("Categories could not be created", 500));
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const { name } = req.body;

    const updatedCategory = await prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        name,
      },
    });
    res.status(200).json({ message: `Category updated successfully!` });
  } catch (err) {
    console.log("Error updating category", err);
    next(createError("Category could not be updated", 500));
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    const deletedCategory = await prisma.category.delete({
      where: {
        id: categoryId,
      },
    });
    res.status(200).json({ message: `Category deleted succesfully!` });
  } catch (err) {
    console.log("Error deleting category", err);
    next(createError("Category could not be deleted", 500));
  }
};
