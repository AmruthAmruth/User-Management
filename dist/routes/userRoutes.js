"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usercontroller_1 = require("../controllers/usercontroller");
const router = express_1.default.Router();
router.get('/', usercontroller_1.getLoginPage);
router.get('/home', usercontroller_1.getHomePage);
router.post('/signup', usercontroller_1.signupUser);
router.post('/login', usercontroller_1.loginUser);
exports.default = router;
