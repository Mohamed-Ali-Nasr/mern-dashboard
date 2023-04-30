"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const general_1 = __importDefault(require("./general"));
const client_1 = __importDefault(require("./client"));
const sales_1 = __importDefault(require("./sales"));
const management_1 = __importDefault(require("./management"));
const router = express_1.default.Router();
exports.default = () => {
    (0, general_1.default)(router);
    (0, client_1.default)(router);
    (0, sales_1.default)(router);
    (0, management_1.default)(router);
    return router;
};
