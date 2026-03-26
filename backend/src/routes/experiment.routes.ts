import { Router } from 'express';
import experimentController from '../controllers/experiment.controller';
import { isAuth } from '../controllers/auth.controller';

const experimentRouter = Router();

experimentRouter.get('/', isAuth, experimentController.getAllExperiments);
experimentRouter.get('/search', isAuth, experimentController.searchExperiments);
experimentRouter.get('/:id', isAuth, experimentController.getExperimentById);
experimentRouter.post('/', isAuth, experimentController.addExperiment);
experimentRouter.put('/:id', isAuth, experimentController.updateExperimentById);
experimentRouter.delete(
  '/:id',
  isAuth,
  experimentController.deleteExperimentById,
);

export default experimentRouter;
