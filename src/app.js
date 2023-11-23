require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const notFoundMiddleware = require("./middlewares/not-found");
const errorMiddleware = require("./middlewares/error");
const rateLimitMiddleware = require("./middlewares/rate-limit");

const userRoute = require("./routes/user-route");
const productRoute = require("./routes/product-route");
const authRoute = require("./routes/auth-route");
const catRoute = require("./routes/category-route");
const cartRoute = require("./routes/cart-route");
const checkoutRoute = require("./routes/checkout-route");
const orderRoute = require("./routes/order-route");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(rateLimitMiddleware);
app.use(express.json());

// # Start here
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/cart", cartRoute);
app.use("/category", catRoute);
app.use("/checkout", checkoutRoute);
app.use("/order", orderRoute);
// ##############

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is listening on ..` + PORT));
