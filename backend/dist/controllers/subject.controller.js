"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const subject_model_1 = __importDefault(require("../models/subject.model"));
const getAllSubjects = (req, res) => {
    const { experimentId } = req.params;
    const subjects = subject_model_1.default.getAll(experimentId);
    res.status(200).json(subjects);
};
const getSubjectByID = (req, res) => {
    const { id } = req.params;
    const subject = subject_model_1.default.getById(id);
    if (!subject) {
        res.status(404).json({
            error: 'Subject not found!',
        });
        return;
    }
    res.status(200).json(subject);
};
const addSubject = (req, res) => {
    const { experimentId } = req.params;
    const userId = req.cookies.userId;
    const { identifier, initialLength, initialWeight, dose, notes } = req.body;
    if (!(identifier === null || identifier === void 0 ? void 0 : identifier.trim())) {
        res.status(400).json({
            error: 'Identifier is required.',
        });
        return;
    }
    const newSubject = subject_model_1.default.add({
        userId,
        experimentId,
        identifier,
        initialWeight: Number(initialWeight) || 0,
        initialLength: Number(initialLength) || 0,
        dose: dose || '',
        notes: notes || '',
    });
    res.status(201).json(newSubject);
};
const updateSubjectById = (req, res) => {
    const { id } = req.params;
    const updated = subject_model_1.default.update(id, req.body);
    if (!updated) {
        res.status(404).json({ error: 'Subject not found.' });
        return;
    }
    res.status(200).json(updated);
};
const deleteSubjectById = (req, res) => {
    const { id } = req.params;
    const isDeleted = subject_model_1.default.delete(id);
    res.status(200).json({
        isSucces: isDeleted,
    });
};
const addLog = (req, res) => {
    const { id } = req.params;
    const { weight, length, notes } = req.body;
    const updated = subject_model_1.default.addLog(id, { weight, length, notes });
    if (!updated) {
        res.status(404).json({ error: 'Subject not found.' });
        return;
    }
    res.status(200).json(updated);
};
exports.default = {
    getAllSubjects,
    getSubjectByID,
    addSubject,
    updateSubjectById,
    deleteSubjectById,
    addLog,
};
