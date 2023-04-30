"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sales_1 = require("../controllers/sales");
exports.default = (router) => {
    router.get("/sales", sales_1.getSales);
};
