const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },

    Email: {
        type: String,
        required: true,
        unique: true
    },

    Password: {
        type: String,
        required: true
    },

    Role: {
        type: String,
        enum: ["Public", "Admin"],
        default: "Public"
    },

    CreatedAt: {
        type: Date,
        default: Date.now
    },

    ProductPurchases: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ]
});

module.exports = mongoose.model("User", UserSchema);