"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pollController_1 = require("../controllers/pollController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const router = express_1.default.Router();
router.post("/", authMiddleware_1.default, pollController_1.createPoll);
router.post("/vote", authMiddleware_1.default, pollController_1.votePoll);
router.get("/", pollController_1.getPolls);
exports.default = router;
//# sourceMappingURL=pollRoutes.js.map