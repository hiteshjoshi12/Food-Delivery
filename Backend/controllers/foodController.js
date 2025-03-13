import foodModel from "../models/foodModel.js";
import fs from "fs";
import cloudinary from "../config/cloudinary.js";
//add food item

const addFood = async (req, res) => {
  // let image_filename = `${req.file.filename}`;

  let image_url = req.file.path;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });
  try {
    await food.save();
    res.json({ success: true, message: "food Added" });
  } catch (error) {
    res.json({ success: false, message: "Error" });
  }
};

//all food list
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    res.json({ success: false, message: "Error" });
  }
};

//remove food items
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        if (!food) {
            return res.json({ success: false, message: "Food not found" });
        }

        // Extract public ID and delete image from Cloudinary
        const publicId = food.image.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`food-delivery/${publicId}`);

        // Remove food item from database
        await foodModel.findByIdAndDelete(req.body.id);

        res.json({ success: true, message: "Food Removed" });
    } catch (error) {
        res.json({ success: false, message: "Error" });
    }
};


export { addFood, listFood, removeFood };
