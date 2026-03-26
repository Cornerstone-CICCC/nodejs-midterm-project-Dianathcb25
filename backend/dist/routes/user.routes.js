"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const auth_controller_1 = require("../controllers/auth.controller");
const userRouter = (0, express_1.Router)();
userRouter.get('/', auth_controller_1.isAuth, user_controller_1.default.getAllUsers);
userRouter.get('/:id', auth_controller_1.isAuth, user_controller_1.default.getUserById);
userRouter.put('/:id', auth_controller_1.isAuth, user_controller_1.default.updateUserById);
userRouter.delete('/:id', auth_controller_1.isAuth, user_controller_1.default.deleteUserById);
exports.default = userRouter;
