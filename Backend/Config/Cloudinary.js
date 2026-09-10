const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const cloudconnection = async () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET
        });

        console.log("Cloud connected successfully");
        // console.log("Cloudinary config:", cloudinary.config());
        

    } catch (error) {
        console.error("Cloud connection failed:", error.message);
    }
};

module.exports = cloudconnection;