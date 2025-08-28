"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const generateAccessToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_ACCESS_SECRET, { expiresIn: "15m" });
};
const generateRefreshToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
};
const register = async (data) => {
    const existing = await User_1.default.findOne({ email: data.email });
    if (existing)
        throw new Error("User already exists");
    const hashed = await bcrypt_1.default.hash(data.password, 10);
    const user = new User_1.default({ ...data, password: hashed });
    return await user.save();
};
const login = async (data) => {
    const user = await User_1.default.findOne({ email: data.email });
    if (!user)
        throw new Error("Invalid credentials");
    const isMatch = await bcrypt_1.default.compare(data.password, user.password);
    if (!isMatch)
        throw new Error("Invalid credentials");
    return {
        accessToken: generateAccessToken(user._id.toString()),
        refreshToken: generateRefreshToken(user._id.toString())
    };
};
const refresh = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_REFRESH_SECRET);
        return generateAccessToken(decoded.id);
    }
    catch {
        throw new Error("Invalid refresh token");
    }
};
exports.default = { register, login, refresh };
//# sourceMappingURL=authService.js.map