"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admincontroller_1 = require("../controllers/admincontroller");
const adminRouter = express_1.default.Router();
adminRouter.get('/admin', admincontroller_1.getAdminDashBored);
exports.default = adminRouter;
