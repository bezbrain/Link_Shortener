require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const mongoose = require("mongoose");

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

const cors = require("cors");

const linkRouter = require("./routes/link");
const linksRouter = require("./routes/links");

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("link-shortener");
});

app.use("/", linkRouter);
app.use("/api/v1/links", linksRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 9000;

const start = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI,
      console.log(`connected to database`)
    );
    app.listen(port, console.log(`server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
