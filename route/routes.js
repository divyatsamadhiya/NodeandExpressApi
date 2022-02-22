const express = require("express");
const router = express.Router();
const Product = require("../productSchema");
const {
    getProducts,
    createProduct,
    getProductByName,
    updateProduct,
    deleteProduct,
} = require("../controller/route_controller");

//one way is to write the routes is like below syntax but we can also setup routeController to more simplify the router code.
// router.get("/", (req, res) => {
//   Product.find({}, function (err, product) {
//     if (err) console.err(err);
//     res.status(200).json({ product });
//   });
// });

router.route("/").get(getProducts).post(createProduct);
router
    .route("/:productName")
    .get(getProductByName)
    .put(updateProduct)
    .delete(deleteProduct);

module.exports = router;
