"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const OverallStatSchema = new mongoose_1.default.Schema({
    totalCustomers: Number,
    yearlySalesTotal: Number,
    yearlyTotalSoldUnits: Number,
    year: Number,
    monthlyData: [
        {
            month: String,
            totalSales: Number,
            totalUnits: Number,
        },
    ],
    dailyData: [
        {
            date: String,
            totalSales: Number,
            totalUnits: Number,
        },
    ],
    salesByCategory: {
        type: Map,
        of: Number,
    },
}, { timestamps: true });
const OverallStat = mongoose_1.default.model("OverallStat", OverallStatSchema);
exports.default = OverallStat;
