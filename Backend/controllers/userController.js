import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";


const createToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // ✅ Check for hardcoded admin credentials
    if (email === "admin@gmail.com" && password === "admin123") {
      const token = createToken("admin", "admin");

      return res.json({
        success: true,
        token,
        userId: "admin",
        role: "admin",
      });
    }

    // ✅ Check for normal user
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User Does Not Exist." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    // ✅ Generate token for normal user
    const token = createToken(user._id, "user");

    res.json({
      success: true,
      token,
      userId: user._id,
      role: "user", // ✅ Send "user" role
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// Register User
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    // Checking if user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User Already Exists." });
    }

    // Validating email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email." });
    }

    // Validating password strength
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters long.",
      });
    }

    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token, userId: user._id });  
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "ERROR" });
  }
};

export { loginUser, registerUser };
