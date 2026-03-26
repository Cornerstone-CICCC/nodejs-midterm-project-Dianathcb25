import { Request, Response } from 'express';
import subjectModel from '../models/subject.model';
import { Subject } from '../types/subject.types';

const getAllSubjects = (
  req: Request<{ experimentId: string }>,
  res: Response,
) => {
  const { experimentId } = req.params;
  const subjects = subjectModel.getAll(experimentId);
  res.status(200).json(subjects);
};

const getSubjectByID = (
  req: Request<{ experimentId: string; id: string }>,
  res: Response,
) => {
  const { id } = req.params;
  const subject = subjectModel.getById(id);
  if (!subject) {
    res.status(404).json({
      error: 'Subject not found!',
    });
    return;
  }
  res.status(200).json(subject);
};

const addSubject = (
  req: Request<
    { experimentId: string },
    {},
    Omit<Subject, 'id' | 'logs' | 'createdAt'>
  >,
  res: Response,
) => {
  const { experimentId } = req.params;
  const userId = req.cookies.userId;
  const { identifier, initialLength, initialWeight, dose, notes } = req.body;

  if (!identifier?.trim()) {
    res.status(400).json({
      error: 'Identifier is required.',
    });
    return;
  }

  const newSubject = subjectModel.add({
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

const updateSubjectById = (
  req: Request<{ experimentId: string; id: string }, {}, Partial<Subject>>,
  res: Response,
) => {
  const { id } = req.params;
  const updated = subjectModel.update(id, req.body);
  if (!updated) {
    res.status(404).json({ error: 'Subject not found.' });
    return;
  }
  res.status(200).json(updated);
};

const deleteSubjectById = (
  req: Request<{ experimentId: string; id: string }>,
  res: Response,
) => {
  const { id } = req.params;
  const isDeleted = subjectModel.delete(id);
  res.status(200).json({
    isSucces: isDeleted,
  });
};

const addLog = (
  req: Request<{ experimentId: string; id: string }>,
  res: Response,
) => {
  const { id } = req.params;
  const { weight, length, notes } = req.body;

  const updated = subjectModel.addLog(id, { weight, length, notes });
  if (!updated) {
    res.status(404).json({ error: 'Subject not found.' });
    return;
  }
  res.status(200).json(updated);
};

export default {
  getAllSubjects,
  getSubjectByID,
  addSubject,
  updateSubjectById,
  deleteSubjectById,
  addLog,
};
