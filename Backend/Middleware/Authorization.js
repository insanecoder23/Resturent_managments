const jwt = require("jsonwebtoken");

require("dotenv").config();


exports.auth = (req, res, next) => {
    try {
       
        let token = req.cookies?.token;
        if (!token && req.headers.authorization) {
            if (req.headers.authorization.startsWith("Bearer ")) {
                token = req.headers.authorization.split(" ")[1];
            }
        }

      
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token missing, please login"
            });
        }

        
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

       
        req.user = decoded;

        console.log("Authenticated user:", req.user);

        next();

    } catch (error) {
        console.log("AUTH ERROR:", error.message);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token, please login again"
        });
    }
};


exports.isPublic = (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
        }

        if (req.user.Role !== "Public") {
            return res.status(403).json({
                success: false,
                message: "Public user access required"
            });
        }

        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Authorization error"
        });
    }
};
exports.isAdmin = (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
        }

        if (req.user.Role !== "Admin") {
            return res.status(403).json({
                success: false,
                message: "Admin access required"
            });
        }

        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Authorization error"
        });
    }
};