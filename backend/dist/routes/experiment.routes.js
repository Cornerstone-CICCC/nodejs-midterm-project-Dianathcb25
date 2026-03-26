"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const experiment_controller_1 = __importDefault(require("../controllers/experiment.controller"));
const auth_controller_1 = require("../controllers/auth.controller");
const experimentRouter = (0, express_1.Router)();
experimentRouter.get('/', auth_controller_1.isAuth, experiment_controller_1.default.getAllExperiments);
experimentRouter.get('/search', auth_controller_1.isAuth, experiment_controller_1.default.searchExperiments);
experimentRouter.get('/:id', auth_controller_1.isAuth, experiment_controller_1.default.getExperimentById);
experimentRouter.post('/', auth_controller_1.isAuth, experiment_controller_1.default.addExperiment);
experimentRouter.put('/:id', auth_controller_1.isAuth, experiment_controller_1.default.updateExperimentById);
experimentRouter.delete('/:id', auth_controller_1.isAuth, experiment_controller_1.default.deleteExperimentById);
exports.default = experimentRouter;
