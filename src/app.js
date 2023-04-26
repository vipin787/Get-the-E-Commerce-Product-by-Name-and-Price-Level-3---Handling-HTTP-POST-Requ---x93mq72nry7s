const fs = require("fs");
const express = require("express");
const app = express();

// Importing products from products.json file
const products = JSON.parse(fs.readFileSync(`${__dirname}/data/products.json`));

// Middlewares
app.use(express.json());

// Endpoint for sending product to the client
app.get("/api/v1/products/:name/:price", (req, res) => {
    const { name, price } = req.params;

    // Find the product with matching name and price
    const product = products.find((p) => p.name === name && p.price == price);

    // If product is found, send it to the client
    if (product) {
        res.status(200).json({
            status: "success",
            message: "Product fetched successfully",
            data: {
                product,
            },
        });
    } 
    else {
        // If product is not found, send error message to the client
        res.status(404).json({
            status: "failed",
            message: "Product not found!",
        });
    }
});

module.exports = app;
 
