"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class SubjectModel {
    constructor() {
        this.subjects = [];
    }
    getAll(experimentId) {
        return this.subjects.filter((s) => s.experimentId === experimentId);
    }
    getById(id) {
        return this.subjects.find((s) => s.id === id);
    }
    add(data) {
        const newSubject = Object.assign(Object.assign({ id: (0, uuid_1.v4)() }, data), { logs: [], createdAt: new Date() });
        this.subjects.push(newSubject);
        return newSubject;
    }
    update(id, data) {
        const index = this.subjects.findIndex((s) => s.id === id);
        if (index === -1)
            return null;
        this.subjects[index] = Object.assign(Object.assign({}, this.subjects[index]), data);
        return this.subjects[index];
    }
    delete(id) {
        const initial = this.subjects.length;
        this.subjects = this.subjects.filter((s) => s.id !== id);
        return this.subjects.length < initial;
    }
    deleteByExperimentId(experimentId) {
        this.subjects = this.subjects.filter((s) => s.experimentId !== experimentId);
    }
    addLog(subjectId, log) {
        const subject = this.getById(subjectId);
        if (!subject)
            return null;
        const newLog = Object.assign({ entryId: (0, uuid_1.v4)(), timestamp: new Date() }, log);
        subject.logs.push(newLog);
        return subject;
    }
}
exports.default = new SubjectModel();
