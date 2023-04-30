"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardStats = exports.getUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const Transaction_1 = __importDefault(require("../models/Transaction"));
const OverallStat_1 = __importDefault(require("../models/OverallStat"));
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield User_1.default.findById(id);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.getUser = getUser;
const getDashboardStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // hardcoded values
        const currentMonth = "November";
        const currentYear = 2021;
        const currentDay = "2021-11-15";
        /* Recent Transactions */
        const transactions = yield Transaction_1.default.find()
            .limit(50)
            .sort({ createdOn: -1 });
        /* Overall Stats */
        const overallStat = yield OverallStat_1.default.find({ year: currentYear });
        const { totalCustomers, yearlyTotalSoldUnits, yearlySalesTotal, monthlyData, salesByCategory, dailyData, } = overallStat[0];
        const thisMonthStats = monthlyData.find(({ month }) => {
            return month === currentMonth;
        });
        const todayStats = dailyData.find(({ date }) => {
            return date === currentDay;
        });
        res.status(200).json({
            totalCustomers,
            yearlyTotalSoldUnits,
            yearlySalesTotal,
            salesByCategory,
            thisMonthStats,
            todayStats,
            transactions,
        });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.getDashboardStats = getDashboardStats;
