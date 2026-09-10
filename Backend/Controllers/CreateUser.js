const User = require("../Model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();



exports.Signup = async (req, res) => {
    try {
        const { Name, Email, Password, Role } = req.body;

       
        if (!Name || !Email || !Password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all details carefully"
            });
        }

        const user = await User.findOne({ Email });

        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exists, please login"
            });
        }
 
        const hashedPassword = await bcrypt.hash(Password, 10);

        const userdata = await User.create({
            Name,
            Email,
            Password: hashedPassword,
            Role:Role
        });

        const userResponse = {
            id: userdata._id,
            Name: userdata.Name,
            Email: userdata.Email,
            Role: userdata.Role,
            CreatedAt: userdata.CreatedAt
        };

        return res.status(201).json({
            success: true,
            data: userResponse,
            message: "User registered successfully"
        });
        
    } catch (error) {
        console.error("Signup error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
}



exports.LogIn = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    if (!Email || !Password) {
      return res.status(400).json({
        success: false,
        message: "Please enter email and password",
      });
    }


    const existuser = await User.findOne({ Email });

    if (!existuser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const match = await bcrypt.compare(
      Password,
      existuser.Password
    );

    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    const payload = {
      Email: existuser.Email,
      id: existuser._id,
      Role: existuser.Role,
    };


    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(
        Date.now() + 3 * 24 * 60 * 60 * 1000
      ),
    });

    return res.status(200).json({
      success: true,
      token: token,

      user: {
        Name: existuser.Name,
        Email: existuser.Email,
        Role: existuser.Role,
      },

      message: "Login successful",
    });

  } catch (error) {
    console.log("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};