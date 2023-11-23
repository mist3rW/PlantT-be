const createError = require("../utils/create-error");

module.exports = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user || user.role !== "ADMIN") {
      return next(createError("Access denied", 403));
    }
    next();
  } catch (error) {
    next(createError("Access denied", 403));
  }
};
