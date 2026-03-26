import { v4 as uuidv4 } from 'uuid';
import { Experiment } from '../types/experiment.type';

class ExperimentModel {
  private experiments: Experiment[] = [];

  getAll(userId: string): Experiment[] {
    return this.experiments.filter((e) => e.userId === userId);
  }

  getById(id: string): Experiment | undefined {
    return this.experiments.find((e) => e.id === id);
  }

  add(data: Omit<Experiment, 'id' | 'createdAt'>): Experiment {
    const newExperiment: Experiment = {
      id: uuidv4(),
      ...data,
      createdAt: new Date(),
    };
    this.experiments.push(newExperiment);
    return newExperiment;
  }

  update(id: string, data: Partial<Experiment>): Experiment | null {
    const index = this.experiments.findIndex((e) => e.id === id);
    if (index === -1) return null;

    this.experiments[index] = { ...this.experiments[index], ...data };
    return this.experiments[index];
  }

  delete(id: string): boolean {
    const initial = this.experiments.length;
    this.experiments = this.experiments.filter((e) => e.id !== id);
    return this.experiments.length < initial;
  }

  search(userId: string, query: string): Experiment[] {
    const q = query.toLowerCase();
    return this.experiments.filter(
      (e) =>
        e.userId === userId &&
        (e.name.toLowerCase().includes(q) ||
          e.species.toLowerCase().includes(q) ||
          e.groupName.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q)),
    );
  }
}

export default new ExperimentModel();
