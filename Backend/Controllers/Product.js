const mongoose = require("mongoose");
const Products = require("../Model/MenuItems");
const cloudinary = require("cloudinary").v2;



exports.AddProduct = async (req, res) => {
  try {
    const { name, description, category, price } = req.body;

    if (!name || !description || !category || !price) {
      return res.status(400).json({
        success: false,
        message: "Please fill all details carefully",
      });
    }

    if (!req.files || !req.files.image) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image",
      });
    }

    const Image = req.files.image;

    console.log(Image.mimetype);

    const response = await cloudinary.uploader.upload(
      Image.tempFilePath,
      {
        folder: "products",
      }
    );

    const products = await Products.create({
      name,
      description,
      category,
      price,
      image: response.secure_url,
    });

    return res.status(201).json({
      success: true,
      data: products,
      message: "Product added successfully",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



exports.getProducts = async (req, res) => {
  try {
    const allProducts = await Products.find({});

    return res.status(200).json({
      success: true,
      data: allProducts,
      message: "Products fetched successfully",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};



exports.updateProductPrice = async (req, res) => {
  try {
    const { name, id, price } = req.body;

    if ((!name && !id) || price === undefined) {
      return res.status(400).json({
        success: false,
        message: "Please provide product name or ID and new price",
      });
    }

    let product;

    if (id) {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
          success: false,
          message: "Invalid product ID",
        });
      }

      product = await Products.findById(id);

    } else if (name) {
      product = await Products.findOne({
        name: name,
      });
    }

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    product.price = price;
    product.UpdatedAt = Date.now();

    await product.save();

    return res.status(200).json({
      success: true,
      data: product,
      message: "Product price updated successfully",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    // Check whether ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Products.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: product,
      message: "Product deleted successfully",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    console.log("Product ID received:", id);

  
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Products.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: product,
      message: "Product fetched successfully",
    });

  } catch (error) {
    console.error("GET PRODUCT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Error fetching product",
      error: error.message,
    });
  }
};