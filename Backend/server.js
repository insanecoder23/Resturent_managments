require("dotenv").config();

const express = require("express");
const connectDB = require("./Config/Dbconnect");
const cloudconnection = require("./Config/Cloudinary");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const routee = require("./Routes/routers");

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  }),
);

app.use("/api/Resturent", routee);

const PORT = process.env.PORT || 3000;

const server = async () => {
  try {
    await connectDB();
    await cloudconnection();

    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("Server failed:", error);
  }
};
server();

app.get("/", (req, res) => {
  res.send("This is your home page");
});
