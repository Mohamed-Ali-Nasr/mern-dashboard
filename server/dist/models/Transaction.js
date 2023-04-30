"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TransactionSchema = new mongoose_1.default.Schema({
    userId: String,
    cost: String,
    products: {
        type: [mongoose_1.default.Types.ObjectId],
        of: Number,
    },
}, { timestamps: true });
const Transaction = mongoose_1.default.model("Transaction", TransactionSchema);
exports.default = Transaction;
