"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_model_1 = __importDefault(require("../models/user.model"));
const pageRouter = (0, express_1.Router)();
pageRouter.get('/auth-check', (req, res) => {
    const { userId } = req.cookies;
    if (!userId) {
        res.status(401).json({ error: 'Session expired or not found.' });
        return;
    }
    const user = user_model_1.default.findById(userId);
    if (!user) {
        res.status(404).json({ error: 'User not found.' });
        return;
    }
    res.status(200).json({
        id: user.id,
        fullname: user.fullname,
        username: user.username,
    });
});
pageRouter.get('/logout', (req, res) => {
    res.clearCookie('userId');
    res.clearCookie('username');
    res.status(200).json({ message: 'Successfully logged out of ' });
});
exports.default = pageRouter;
