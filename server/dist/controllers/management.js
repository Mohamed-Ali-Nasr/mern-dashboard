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
exports.getUserPerformance = exports.getAdmins = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("../models/User"));
const Transaction_1 = __importDefault(require("../models/Transaction"));
const getAdmins = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admins = yield User_1.default.find({ role: "admin" }).select("-password");
        res.status(200).json(admins);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.getAdmins = getAdmins;
const getUserPerformance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userWithStats = yield User_1.default.aggregate([
            { $match: { _id: new mongoose_1.default.Types.ObjectId(id) } },
            {
                $lookup: {
                    from: "affiliatestats",
                    localField: "_id",
                    foreignField: "userId",
                    as: "affiliateStats",
                },
            },
            { $unwind: "$affiliateStats" },
        ]);
        const saleTransactions = yield Promise.all(userWithStats[0].affiliateStats.affiliateSales.map((id) => {
            return Transaction_1.default.findById(id);
        }));
        const filteredSaleTransactions = saleTransactions.filter((transaction) => transaction !== null);
        res
            .status(200)
            .json({ user: userWithStats[0], sales: filteredSaleTransactions });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.getUserPerformance = getUserPerformance;
