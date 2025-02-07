import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from "razorpay";
import crypto from "crypto";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Place Order API
const placeOrder = async (req, res) => {
  try {
    console.log("🔹 Incoming Order Request:", req.body);

    if (!req.body.items || req.body.items.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty!" });
    }

    // Generate a new Razorpay Order
    const options = {
      amount: req.body.amount * 100, // Convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);
    console.log("✅ Razorpay Order Created:", razorpayOrder);

    res.json({
      success: true,
      message: "Payment initiation successful",
      orderId: razorpayOrder.id, // Send Razorpay Order ID
      amount: options.amount,
      currency: options.currency,
      key_id: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("❌ Error in placeOrder:", error);
    res.status(500).json({ success: false, message: "Order placement failed." });
  }
};


// Generate Razorpay Order
const createRazorpayOrder = async (req, res) => {
  try {
    console.log("🔹 Creating Razorpay Order:", req.body);

    const { orderId } = req.body;
    const order = await orderModel.findById(orderId);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found." });
    }

    const options = {
      amount: order.amount * 100, // Convert to paise
      currency: "INR",
      receipt: order._id.toString(),
      payment_capture: 1
    };

    const razorpayOrder = await razorpay.orders.create(options);

    order.razorpay_order_id = razorpayOrder.id;
    await order.save();

    res.json({
      success: true,
      orderId: razorpayOrder.id,
      amount: order.amount,
      currency: "INR",
      key_id: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    console.error("❌ Error creating Razorpay order:", error);
    res.status(500).json({ success: false, message: "Payment initialization failed." });
  }
};

// Verify Order API
const verifyOrder = async (req, res) => {
  try {
    console.log("🔹 Verifying Payment:", req.body);

    const { orderId, payment_id, razorpay_signature, userId, items, amount, address } = req.body;

    if (!orderId || !payment_id || !razorpay_signature || !userId || !amount || !address) {
      console.log("❌ Missing required fields in verifyOrder:", req.body);
      return res.status(400).json({ success: false, message: "Invalid payment data." });
    }

    // Compute HMAC signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(orderId + "|" + payment_id)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      console.log("❌ Signature Mismatch!");
      return res.status(400).json({ success: false, message: "Invalid Razorpay signature." });
    }

    // ✅ Save order in the database only after successful payment
    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
      payment: true,
      razorpay_order_id: orderId,
    });

    await newOrder.save();
    console.log("✅ Order Saved:", newOrder);

    res.json({ success: true, message: "Payment verified. Order saved." });
  } catch (error) {
    console.error("❌ Error in verifyOrder:", error);
    res.status(500).json({ success: false, message: "Payment verification failed." });
  }
};




// Fetch User Orders
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error("❌ Error fetching user orders:", error);
    res.status(500).json({ success: false, message: "Error fetching user orders." });
  }
};

// Fetch All Orders (Admin Panel)
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error("❌ Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Error fetching orders." });
  }
};

// Update Order Status
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({ success: true, message: "Order status updated." });
  } catch (error) {
    console.error("❌ Error updating status:", error);
    res.status(500).json({ success: false, message: "Error updating status." });
  }
};

export { placeOrder, createRazorpayOrder, verifyOrder, userOrders, listOrders, updateStatus };
