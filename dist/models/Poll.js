"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// models/Poll.ts
const mongoose_1 = require("mongoose");
const OptionSchema = new mongoose_1.Schema({
    text: { type: String, required: true },
    votes: { type: Number, default: 0 },
});
const PollSchema = new mongoose_1.Schema({
    question: { type: String, required: true },
    options: [OptionSchema],
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Poll", PollSchema);
//# sourceMappingURL=Poll.js.map