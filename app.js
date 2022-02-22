const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./db");
const Product = require("./productSchema");
const router = require("./route/routes");

app.use(express.json());
app.use("/api/v1/products", router);

//routes - you can directly write all routes in this file only without using router and routeController file but that can complicate the code so it's always better to use router and routeController to simplyfi the code.

// app.post("/api/createProduct", (req, res) => {
//   const product = new Product(req.body);
//   product.save(function (err, product) {
//     if (err) return console.err(err);
//     res.status(201).json({ product });
//   });
// });

// app.get("/api/product/:productName", (req, res) => {
//   Product.findOne({ name: req.params.productName }, function (err, product) {
//     if (err) return console.err(err);
//     res.status(200).json({ product });
//   });
// });

// app.put("/api/updateProduct/:productName", (req, res) => {
//   Product.findOneAndUpdate(
//     { name: req.params.productName },
//     req.body,
//     function (err, updatedProduct) {
//       if (err) return console.err(err);
//       res.status(201).json({ updatedProduct });
//     }
//   );
// });

// app.delete("/api/removeProduct/:productName", (req, res) => {
//   Product.deleteOne({ name: req.params.productName }, function (err, data) {
//     if (err) return console.err(err);
//     res.status(204).json({ data });
//   });
// });

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log("connected to " + process.env.MONGO_URI);
        const listener = app.listen(process.env.PORT || 5000, () => {
            console.log(
                "Server is listening on port " + listener.address().port
            );
        });
    } catch (error) {
        console.log(error);
    }
};

start();
