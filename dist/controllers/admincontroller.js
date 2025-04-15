"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdminDashBored = void 0;
const getAdminDashBored = (req, res) => {
    console.log("Admin dash");
    res.render('admindash');
};
exports.getAdminDashBored = getAdminDashBored;
