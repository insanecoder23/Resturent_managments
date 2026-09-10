const express = require("express");

const route = express.Router();

const { Signup, LogIn } = require("../Controllers/CreateUser");

const {
  AddProduct,
  getProducts,
  updateProductPrice,
  deleteProduct,getProductById
} = require("../Controllers/Product");

const { auth, isPublic, isAdmin } = require("../Middleware/Authorization");

route.post("/signup", Signup);

route.post("/login", LogIn);

route.post(
    "/add-product",
    auth,
    isAdmin,
    AddProduct
);
route.get("/test-auth", auth, (req, res) => {
    res.json({
        success: true,
        message: "Authorization working",
        user: req.user
    });
});
route.get("/product/:id", getProductById);

route.get("/products", getProducts);
route.put("/update-product-price", auth, isAdmin, updateProductPrice);

route.delete("/delete-product", auth, isAdmin, deleteProduct);

module.exports = route;

