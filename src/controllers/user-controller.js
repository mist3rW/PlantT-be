const prisma = require("../models/prisma");
const createError = require("../utils/create-error");

exports.getUser = async (req, res, next) => {
  try {
    const allUser = await prisma.user.findMany();
    res.status(200).json(allUser);
  } catch (err) {
    console.error("User could not be read", err);
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const targetUserId = req.params.id;
    const deleteTargetUser = await prisma.user.delete({
      where: {
        id: targetUserId,
      },
    });
    res.status(200).json({
      message: `${targetUserId} data has been deleted successfully!`,
    });
  } catch (error) {
    console.error("Error deleting user", error);
    next(error);
  }
};
