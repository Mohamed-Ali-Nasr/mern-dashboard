"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const management_1 = require("../controllers/management");
exports.default = (router) => {
    router.get("/management/admins", management_1.getAdmins);
    router.get("/management/performance/:id", management_1.getUserPerformance);
};
