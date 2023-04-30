"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const general_1 = require("../controllers/general");
exports.default = (router) => {
    router.get("/general/user/:id", general_1.getUser);
    router.get("/general/dashboard", general_1.getDashboardStats);
};
