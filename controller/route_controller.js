const Product = require("../productSchema");

const getProducts = async (req, res) => {
    try {
        await Product.find({}, function (err, product) {
            if (err) console.err(err);
            res.status(200).json({ product });
        });
    } catch (error) {
        console.log(error);
    }
};

const createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        product.save(function (err, product) {
            if (err) return console.err(err);
            res.status(201).json({ product });
        });
    } catch (error) {
        console.log(error);
    }
};

const getProductByName = async (req, res) => {
    try {
        Product.findOne(
            { name: req.params.productName },
            function (err, product) {
                if (err) return console.err(err);
                res.status(200).json({ product });
            }
        );
    } catch (error) {
        console.log(error);
    }
};

const updateProduct = async (req, res) => {
    try {
        Product.findOneAndUpdate(
            { name: req.params.productName },
            req.body,
            function (err, updatedProduct) {
                if (err) return console.err(err);
                res.status(201).json({ updatedProduct });
            }
        );
    } catch (error) {
        console.log(error);
    }
};

const deleteProduct = async (req, res) => {
    try {
        Product.deleteOne(
            { name: req.params.productName },
            function (err, data) {
                if (err) return console.err(err);
                res.status(204).json({ data });
            }
        );
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getProducts,
    createProduct,
    getProductByName,
    updateProduct,
    deleteProduct,
};
