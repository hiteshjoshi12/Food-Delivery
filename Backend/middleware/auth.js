import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.log("No token or incorrect format");
        return res.json({ success: false, message: "Not Authorized Login Again" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded);  // ✅ Log decoded user data
        req.body.userId = decoded.id;
        next();
    } catch (error) {
        console.log("JWT Verification Error:", error.message);
        res.json({ success: false, message: "Invalid Token" });
    }
};

export default authMiddleware;
