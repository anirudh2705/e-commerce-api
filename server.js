const express = require("express");
require("dotenv").config();
require("express-async-errors");

const connectDb = require("./db/connect");

const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const reviewRouter = require("./routes/reviewRoutes");

//middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

const app = express();

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use(express.static("./public"));
app.use(fileUpload());

app.get("/api/v1/test", (req, res) => {
  console.log(req.cookies);
  console.log(req.signedCookies);
  res.send("ecomapi");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/reviews", reviewRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(port, () => console.log(`server started on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
