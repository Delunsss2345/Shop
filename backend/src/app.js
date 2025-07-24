const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
// Middlewares
const responseHandler = require("@/middlewares/responseHandler");
const errorHandler = require("@/middlewares/errorHandler");

//Router
const userRoutes = require("@/routes/user.routes");
const productRoutes = require("@/routes/product.routes");
const authRoutes = require("@/routes/auth.route");
const cartRoutes = require("@/routes/cart.route");

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(responseHandler);

app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);

app.use(errorHandler);
module.exports = app;
