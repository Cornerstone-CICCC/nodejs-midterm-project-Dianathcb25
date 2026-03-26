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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const zxcvbn_1 = __importDefault(require("zxcvbn"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullname, username, password } = req.body;
    if (!(fullname === null || fullname === void 0 ? void 0 : fullname.trim()) || !(username === null || username === void 0 ? void 0 : username.trim()) || !(password === null || password === void 0 ? void 0 : password.trim())) {
        res.status(400).json({ error: 'All fields are required.' });
        return;
    }
    const passwordScore = (0, zxcvbn_1.default)(password).score;
    if (passwordScore <= 2) {
        res.status(400).json({
            error: 'Password is too weak. Try a longer or more complex password.',
        });
        return;
    }
    const newUser = yield user_model_1.default.add(fullname, username, password);
    if (!newUser) {
        res.status(409).json({ error: 'Username is already taken.' });
        return;
    }
    res.cookie('userId', newUser.id, { maxAge: 60 * 60 * 1000, httpOnly: true });
    res.cookie('username', newUser.username, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
    });
    res.status(201).json({
        id: newUser.id,
        fullname: newUser.fullname,
        username: newUser.username,
    });
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!(username === null || username === void 0 ? void 0 : username.trim()) || !(password === null || password === void 0 ? void 0 : password.trim())) {
        res.status(400).json({ error: 'Username and password are required.' });
        return;
    }
    const user = yield user_model_1.default.login(username, password);
    if (!user) {
        res.status(401).json({ error: 'Invalid username or password.' });
        return;
    }
    res.cookie('userId', user.id, { maxAge: 60 * 60 * 1000, httpOnly: true });
    res.cookie('username', user.username, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
    });
    res.status(200).json({
        id: user.id,
        fullname: user.fullname,
        username: user.username,
    });
});
const getAllUsers = (req, res) => {
    const users = user_model_1.default.findAll();
    res.status(200).json(users);
};
const getUserById = (req, res) => {
    const { id } = req.params;
    const user = user_model_1.default.findById(id);
    if (!user) {
        res.status(404).json({ error: 'User not found!' });
        return;
    }
    const { password } = user, safeUser = __rest(user, ["password"]);
    res.status(200).json(safeUser);
};
const updateUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (req.body.password) {
        const passwordScore = (0, zxcvbn_1.default)(req.body.password).score;
        if (passwordScore <= 2) {
            res.status(400).json({ error: 'Password is too weak!' });
            return;
        }
    }
    const result = yield user_model_1.default.update(id, req.body);
    if (result === 'taken') {
        res.status(409).json({ error: 'Username is already taken.' });
        return;
    }
    if (!result) {
        res.status(404).json({ error: 'User not found!' });
        return;
    }
    const { password } = result, safeUser = __rest(result, ["password"]);
    res.status(200).json(safeUser);
});
const deleteUserById = (req, res) => {
    const { id } = req.params;
    const isDeleted = user_model_1.default.deleteById(id);
    res.status(200).json({ isSuccess: isDeleted });
};
exports.default = {
    register,
    login,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
};
