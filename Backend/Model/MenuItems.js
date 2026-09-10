const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    availability: {
        type: Boolean,
        default: true
    },

    image: {
        type: String,
        required:true
    },

    CreatedAt: {
        type: Date,
        default: Date.now
    },

    UpdatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Product", MenuSchema);