const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./db");
const Product = require("./productSchema");

app.use(express.json());

app.post("/api/createProduct", (req, res) => {
  const product = new Product(req.body);
  res.status(201).json({ product });
});

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("connected to " + process.env.MONGO_URI);
    const listener = app.listen(process.env.PORT || 5000, () => {
      console.log("Server is listening on port " + listener.address().port);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
