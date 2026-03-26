"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class ExperimentModel {
    constructor() {
        this.experiments = [];
    }
    getAll(userId) {
        return this.experiments.filter((e) => e.userId === userId);
    }
    getById(id) {
        return this.experiments.find((e) => e.id === id);
    }
    add(data) {
        const newExperiment = Object.assign(Object.assign({ id: (0, uuid_1.v4)() }, data), { createdAt: new Date() });
        this.experiments.push(newExperiment);
        return newExperiment;
    }
    update(id, data) {
        const index = this.experiments.findIndex((e) => e.id === id);
        if (index === -1)
            return null;
        this.experiments[index] = Object.assign(Object.assign({}, this.experiments[index]), data);
        return this.experiments[index];
    }
    delete(id) {
        const initial = this.experiments.length;
        this.experiments = this.experiments.filter((e) => e.id !== id);
        return this.experiments.length < initial;
    }
    search(userId, query) {
        const q = query.toLowerCase();
        return this.experiments.filter((e) => e.userId === userId &&
            (e.name.toLowerCase().includes(q) ||
                e.species.toLowerCase().includes(q) ||
                e.groupName.toLowerCase().includes(q) ||
                e.description.toLowerCase().includes(q)));
    }
}
exports.default = new ExperimentModel();
