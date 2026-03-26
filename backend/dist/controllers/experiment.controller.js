"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const experiment_model_1 = __importDefault(require("../models/experiment.model"));
const subject_model_1 = __importDefault(require("../models/subject.model"));
const getAllExperiments = (req, res) => {
    const userId = req.cookies.userId;
    const experiments = experiment_model_1.default.getAll(userId);
    res.status(200).json(experiments);
};
const getExperimentById = (req, res) => {
    const { id } = req.params;
    const experiment = experiment_model_1.default.getById(id);
    if (!experiment) {
        res.status(404).json({
            error: 'Experiment not found!',
        });
        return;
    }
    res.status(200).json(experiment);
};
const searchExperiments = (req, res) => {
    const userId = req.cookies.userId;
    const { q } = req.body;
    const results = experiment_model_1.default.search(userId, String(q || ''));
    res.status(200).json(results);
};
const addExperiment = (req, res) => {
    const userId = req.cookies.userId;
    const { name, description, species, groupName } = req.body;
    if (!(name === null || name === void 0 ? void 0 : name.trim()) || !(species === null || species === void 0 ? void 0 : species.trim()) || !(groupName === null || groupName === void 0 ? void 0 : groupName.trim())) {
        res.status(400).json({
            error: 'Name, species and group are required.',
        });
        return;
    }
    const newExperiment = experiment_model_1.default.add({
        userId,
        name,
        description: description || '',
        species,
        groupName,
    });
    res.status(201).json(newExperiment);
};
const updateExperimentById = (req, res) => {
    const { id } = req.params;
    const updated = experiment_model_1.default.update(id, req.body);
    if (!updated) {
        res.status(404).json({ error: 'Experiment not found.' });
        return;
    }
    res.status(200).json(updated);
};
const deleteExperimentById = (req, res) => {
    const { id } = req.params;
    subject_model_1.default.deleteByExperimentId(id);
    const isDeleted = experiment_model_1.default.delete(id);
    res.status(200).json({
        isSucces: isDeleted,
    });
};
exports.default = {
    getAllExperiments,
    getExperimentById,
    searchExperiments,
    addExperiment,
    updateExperimentById,
    deleteExperimentById,
};
