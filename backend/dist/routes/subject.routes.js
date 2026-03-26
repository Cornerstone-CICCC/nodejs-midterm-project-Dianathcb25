"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const subject_controller_1 = __importDefault(require("../controllers/subject.controller"));
const auth_controller_1 = require("../controllers/auth.controller");
const subjectRouter = (0, express_1.Router)();
subjectRouter.get('/', auth_controller_1.isAuth, subject_controller_1.default.getAllSubjects);
subjectRouter.get('/:id', auth_controller_1.isAuth, subject_controller_1.default.getSubjectByID);
subjectRouter.post('/', auth_controller_1.isAuth, subject_controller_1.default.addSubject);
subjectRouter.put('/:id', auth_controller_1.isAuth, subject_controller_1.default.updateSubjectById);
subjectRouter.delete('/:id', auth_controller_1.isAuth, subject_controller_1.default.deleteSubjectById);
subjectRouter.post('/:id/logs', auth_controller_1.isAuth, subject_controller_1.default.addLog);
exports.default = subjectRouter;
