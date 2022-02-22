const Product = require("../productSchema");

//callback function approach for talking with db
const getProducts = (req, res) => {
    Product.find({}, function (err, product) {
        if (err) console.err(err);
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
        if (err) return console.err(err);
        res.status(201).json({ product });
    });
};

const getProductByName = (req, res) => {
    Product.findOne({ name: req.params.productName }, function (err, product) {
        if (err) return console.err(err);
        res.status(200).json({ product });
    });
};

const updateProduct = (req, res) => {
    Product.findOneAndUpdate(
        { name: req.params.productName },
        req.body,
        function (err, updatedProduct) {
            if (err) return console.err(err);
            res.status(201).json({ updatedProduct });
        }
    );
};

const deleteProduct = (req, res) => {
    Product.deleteOne({ name: req.params.productName }, function (err, data) {
        if (err) return console.err(err);
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
