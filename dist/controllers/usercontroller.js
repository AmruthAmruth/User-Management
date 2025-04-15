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
exports.loginUser = exports.signupUser = exports.getLoginPage = exports.getHomePage = void 0;
const usermodel_1 = __importDefault(require("../models/usermodel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const getHomePage = (req, res) => {
    res.render('home');
};
exports.getHomePage = getHomePage;
const getLoginPage = (req, res) => {
    res.render('login');
};
exports.getLoginPage = getLoginPage;
const signupUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        console.log(req.body);
        const existingUser = yield usermodel_1.default.findOne({ email });
        if (existingUser) {
            return res.redirect('/');
        }
        const saltRounds = 10;
        const hashedPassword = yield bcryptjs_1.default.hash(password, saltRounds);
        const newUser = new usermodel_1.default({ name, email, password: hashedPassword });
        yield newUser.save();
        return res.redirect('/home');
    }
    catch (error) {
        console.error(error);
        return res.redirect('/');
    }
});
exports.signupUser = signupUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        console.log(req.body);
        if (email === 'admin@gmail.com' && password === '123456') {
            console.log('Admin login success');
            return res.redirect('/admin');
        }
        const user = yield usermodel_1.default.findOne({ email });
        if (!user) {
            console.log('User not found');
            return res.redirect('/');
        }
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            console.log('Password does not match');
            return res.redirect('/');
        }
        console.log('User login success');
        return res.redirect('/home');
    }
    catch (error) {
        console.error('Login error:', error);
        return res.redirect('/');
    }
});
exports.loginUser = loginUser;
