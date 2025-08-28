"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User")); // adjust path if needed
const authMiddleware = async (req, res, next) => {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        try {
            // Extract token
            token = req.headers.authorization.split(" ")[1];
            // Verify token
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_ACCESS_SECRET);
            // Attach user (excluding password) to request
            req.user = await User_1.default.findById(decoded.id).select("-password");
            if (!req.user) {
                return res.status(401).json({ message: "User not found" });
            }
            next();
        }
        catch (error) {
            console.error(error);
            return res.status(401).json({ message: "Not authorized, token failed" });
        }
    }
    else {
        return res.status(401).json({ message: "Not authorized, no token" });
    }
};
// at the very end of authMiddleware.ts
exports.default = authMiddleware;
//# sourceMappingURL=authMiddleware.js.map