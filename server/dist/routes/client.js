"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../controllers/client");
exports.default = (router) => {
    router.get("/client/products", client_1.getProducts);
    router.get("/client/customers", client_1.getCustomers);
    router.get("/client/transactions", client_1.getTransactions);
    router.get("/client/geography", client_1.getGeography);
};
