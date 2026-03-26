import { v4 as uuidv4 } from 'uuid';
import { Subject } from '../types/subject.types';
import { LabEntry } from '../types/labEntry.types';

class SubjectModel {
  private subjects: Subject[] = [];

  getAll(experimentId: string): Subject[] {
    return this.subjects.filter((s) => s.experimentId === experimentId);
  }

  getById(id: string): Subject | undefined {
    return this.subjects.find((s) => s.id === id);
  }

  add(data: Omit<Subject, 'id' | 'logs' | 'createdAt'>): Subject {
    const newSubject: Subject = {
      id: uuidv4(),
      ...data,
      logs: [],
      createdAt: new Date(),
    };
    this.subjects.push(newSubject);
    return newSubject;
  }

  update(id: string, data: Partial<Subject>): Subject | null {
    const index = this.subjects.findIndex((s) => s.id === id);
    if (index === -1) return null;

    this.subjects[index] = { ...this.subjects[index], ...data };
    return this.subjects[index];
  }

  delete(id: string): boolean {
    const initial = this.subjects.length;
    this.subjects = this.subjects.filter((s) => s.id !== id);
    return this.subjects.length < initial;
  }

  deleteByExperimentId(experimentId: string): void {
    this.subjects = this.subjects.filter(
      (s) => s.experimentId !== experimentId,
    );
  }

  addLog(
    subjectId: string,
    log: Omit<LabEntry, 'entryId' | 'timestamp'>,
  ): Subject | null {
    const subject = this.getById(subjectId);
    if (!subject) return null;

    const newLog: LabEntry = {
      entryId: uuidv4(),
      timestamp: new Date(),
      ...log,
    };
    subject.logs.push(newLog);
    return subject;
  }
}

export default new SubjectModel();
