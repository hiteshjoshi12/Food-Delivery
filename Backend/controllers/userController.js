import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
  };

//login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User Does Not Exist." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(user._id);
    res.json({ success: true, token, userId: user._id });  // ✅ Include userId in response
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};


//Register user
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    //checking if user is already exist
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User Already Exists." });
    }

    //validating email format and strong password
    if (!validator.isEmail) {
      return res.json({ success: false, message: "Please enter valid email." });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter password greater than 8.",
      });
    }

    //hasing the password
    const salt = await bcrypt.genSalt(10);
    const hassedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hassedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    res.json({ success: false, message: "ERROR" });
  }
};

export { loginUser, registerUser };
