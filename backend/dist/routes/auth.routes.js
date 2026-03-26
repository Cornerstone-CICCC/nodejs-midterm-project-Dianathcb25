"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const authRouter = (0, express_1.Router)();
authRouter.post('/register', user_controller_1.default.register);
authRouter.post('/login', user_controller_1.default.login);
exports.default = authRouter;
