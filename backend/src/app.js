const express = require("express");
const cors = require("cors");
// Middlewares
const responseHandler = require("@/middlewares/responseHandler");
const errorHandler = require("@/middlewares/errorHandler");

//Router
const userRoutes = require("@/routes/user.routes");
const productRoutes = require("@/routes/product.routes");

const app = express();
app.use(express.json({ limit: "10mb" }));

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

app.use(errorHandler);
module.exports = app;
