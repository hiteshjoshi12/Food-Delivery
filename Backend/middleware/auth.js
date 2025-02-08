import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
       
        return res.json({ success: false, message: "Not Authorized Login Again" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
   
        req.body.userId = decoded.id;
        next();
    } catch (error) {
        res.json({ success: false, message: "Invalid Token" });
    }
};

export default authMiddleware;
