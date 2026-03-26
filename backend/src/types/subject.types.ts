import { LabEntry } from './labEntry.types';

export interface Subject {
  id: string;
  userId: string;
  experimentId: string;
  identifier: string;
  initialWeight: number;
  initialLength: number;
  dose: string;
  notes: string;
  logs: LabEntry[];
  createdAt: Date;
}
