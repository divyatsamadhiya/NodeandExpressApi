const Product = require("../model/productSchema");

//callback function approach for talking with db
const getProducts = (req, res) => {
    Product.find({}, function (err, product) {
        if (err) res.status(500).json({ msg: err });
        res.status(200).json({ product });
    });
};

//async-await approach for talking with db

// const getProducts = async (req, res) => {
//     try {
//         const product = await Product.find({});
//         res.status(200).json({ product });
//     } catch (error) {
//         console.log(error);
//     }
// };

const createProduct = (req, res) => {
    const product = new Product(req.body);
    product.save(function (err, product) {
        if (err) res.status(500).json({ msg: err });
        res.status(201).json({ product });
    });
};

// const getProductByName = (req, res) => {
//     Product.findOne({ name: req.params.productName }, function (err, product) {
//         if (err) res.status(500).json({ msg: err });
//         res.status(200).json({ product });
//     });
// };

//method with product's existence in db validation
const getProductByName = async (req, res) => {
    try {
        const product = await Product.findOne({ name: req.params.productName });
        if (!product) {
            res.status(404).json({
                msg: `No product exist with name ${req.params.productName}`,
            });
        }
        res.status(200).json({ product });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

const updateProduct = (req, res) => {
    Product.findOneAndUpdate(
        { name: req.params.productName },
        req.body,
        { new: true, runValidators: true },
        function (err, updatedProduct) {
            if (err) res.status(500).json({ msg: err });
            res.status(201).json({ updatedProduct });
        }
    );
};

const deleteProduct = (req, res) => {
    Product.deleteOne({ name: req.params.productName }, function (err, data) {
        if (err) res.status(500).json({ msg: err });
        res.status(204).json({ data });
    });
};

module.exports = {
    getProducts,
    createProduct,
    getProductByName,
    updateProduct,
    deleteProduct,
};
