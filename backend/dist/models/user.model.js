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
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserModel {
    constructor() {
        this.users = [];
    }
    findAll() {
        return this.users.map((_a) => {
            var { password } = _a, u = __rest(_a, ["password"]);
            return u;
        });
    }
    findById(id) {
        return this.users.find((u) => u.id === id);
    }
    findByUsername(username) {
        return this.users.find((u) => u.username.toLocaleLowerCase() === username.toLocaleLowerCase());
    }
    add(fullname, username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const found = this.findByUsername(username);
            if (found)
                return null;
            const hashedPassword = yield bcrypt_1.default.hash(password, 12);
            const newUser = {
                id: (0, uuid_1.v4)(),
                fullname,
                username,
                password: hashedPassword,
            };
            this.users.push(newUser);
            return newUser;
        });
    }
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.findByUsername(username);
            if (!user)
                return null;
            const isMatch = yield bcrypt_1.default.compare(password, user.password);
            return isMatch ? user : null;
        });
    }
    update(id, changes) {
        return __awaiter(this, void 0, void 0, function* () {
            const founIndex = this.users.findIndex((u) => u.id === id);
            if (founIndex === -1) {
                return null;
            }
            if (changes.username) {
                const taken = this.users.find((u) => u.username.toLowerCase() === changes.username.toLowerCase() &&
                    u.id !== id);
                if (taken) {
                    return 'taken';
                }
            }
            if (changes.password) {
                changes.password = yield bcrypt_1.default.hash(changes.password, 12);
            }
            this.users[founIndex] = Object.assign(Object.assign({}, this.users[founIndex]), changes);
            return this.users[founIndex];
        });
    }
    deleteById(id) {
        const initial = this.users.length;
        this.users = this.users.filter((u) => u.id !== id);
        return this.users.length < initial;
    }
}
exports.default = new UserModel();
