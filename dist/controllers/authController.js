"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refresh = exports.login = exports.register = void 0;
const authService_1 = __importDefault(require("../services/authService"));
const register = async (req, res) => {
    try {
        const user = await authService_1.default.register(req.body);
        res.json(user);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const tokens = await authService_1.default.login(req.body);
        res.json(tokens);
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
};
exports.login = login;
const refresh = async (req, res) => {
    try {
        const { token } = req.body;
        const accessToken = authService_1.default.refresh(token);
        res.json({ accessToken });
    }
    catch (err) {
        res.status(401).json({ error: err.message });
    }
};
exports.refresh = refresh;
//# sourceMappingURL=authController.js.map