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
exports.getGeography = exports.getTransactions = exports.getCustomers = exports.getProducts = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const ProductStat_1 = __importDefault(require("../models/ProductStat"));
const User_1 = __importDefault(require("../models/User"));
const Transaction_1 = __importDefault(require("../models/Transaction"));
// @ts-ignore
const country_iso_2_to_3_1 = __importDefault(require("country-iso-2-to-3"));
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield Product_1.default.find();
        const productsWithStats = yield Promise.all(products.map((product) => __awaiter(void 0, void 0, void 0, function* () {
            const stat = yield ProductStat_1.default.find({
                productId: product._id,
            });
            return {
                product,
                stat,
            };
        })));
        res.status(200).json(productsWithStats);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.getProducts = getProducts;
const getCustomers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // to make sure we don't include the password when we send it to the frontend
        const customers = yield User_1.default.find({ role: "user" }).select("-password");
        res.status(200).json(customers);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.getCustomers = getCustomers;
const getTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // sort should look like this: { "field": "userId", "sort": "desc"}
        const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;
        // formatted sort should look like { userId: -1 }
        const generateSort = () => {
            const sortParsed = JSON.parse(sort);
            const sortFormatted = {
                [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
            };
            return sortFormatted;
        };
        const sortFormatted = Boolean(sort) ? generateSort() : {};
        const transactions = yield Transaction_1.default.find({
            $or: [
                { cost: { $regex: new RegExp(search, "i") } },
                { userId: { $regex: new RegExp(search, "i") } },
            ],
        })
            .sort(sortFormatted)
            .skip(Number(page) * Number(pageSize))
            .limit(Number(pageSize));
        const total = yield Transaction_1.default.countDocuments({
            userId: { $regex: search, $options: "i" },
        });
        res.status(200).json({
            transactions,
            total,
        });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.getTransactions = getTransactions;
const getGeography = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.default.find();
        const mappedLocations = users.reduce((acc, { country }) => {
            const countryISO3 = (0, country_iso_2_to_3_1.default)(country);
            if (!acc[countryISO3]) {
                acc[countryISO3] = 0;
            }
            acc[countryISO3]++;
            return acc;
        }, {});
        const formattedLocations = Object.entries(mappedLocations).map(([country, count]) => {
            return { id: country, value: count };
        });
        res.status(200).json(formattedLocations);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.getGeography = getGeography;
