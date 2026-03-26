import { Request, Response } from 'express';
import experimentModel from '../models/experiment.model';
import subjectModel from '../models/subject.model';
import { Experiment } from '../types/experiment.type';

const getAllExperiments = (req: Request, res: Response) => {
  const userId = req.cookies.userId;
  const experiments = experimentModel.getAll(userId);
  res.status(200).json(experiments);
};

const getExperimentById = (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const experiment = experimentModel.getById(id);
  if (!experiment) {
    res.status(404).json({
      error: 'Experiment not found!',
    });
    return;
  }
  res.status(200).json(experiment);
};

const searchExperiments = (req: Request, res: Response) => {
  const userId = req.cookies.userId;
  const { q } = req.body;
  const results = experimentModel.search(userId, String(q || ''));
  res.status(200).json(results);
};

const addExperiment = (
  req: Request<{}, {}, Omit<Experiment, 'id' | 'userId' | 'createdAt'>>,
  res: Response,
) => {
  const userId = req.cookies.userId;
  const { name, description, species, groupName } = req.body;

  if (!name?.trim() || !species?.trim() || !groupName?.trim()) {
    res.status(400).json({
      error: 'Name, species and group are required.',
    });
    return;
  }

  const newExperiment = experimentModel.add({
    userId,
    name,
    description: description || '',
    species,
    groupName,
  });
  res.status(201).json(newExperiment);
};

const updateExperimentById = (
  req: Request<{ id: string }, {}, Partial<Experiment>>,
  res: Response,
) => {
  const { id } = req.params;
  const updated = experimentModel.update(id, req.body);
  if (!updated) {
    res.status(404).json({ error: 'Experiment not found.' });
    return;
  }
  res.status(200).json(updated);
};

const deleteExperimentById = (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  subjectModel.deleteByExperimentId(id);
  const isDeleted = experimentModel.delete(id);
  res.status(200).json({
    isSucces: isDeleted,
  });
};

export default {
  getAllExperiments,
  getExperimentById,
  searchExperiments,
  addExperiment,
  updateExperimentById,
  deleteExperimentById,
};
