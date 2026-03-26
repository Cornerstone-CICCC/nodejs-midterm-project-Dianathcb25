import { Router } from 'express';
import subjectController from '../controllers/subject.controller';
import { isAuth } from '../controllers/auth.controller';

const subjectRouter = Router();

subjectRouter.get('/', isAuth, subjectController.getAllSubjects);
subjectRouter.get('/:id', isAuth, subjectController.getSubjectByID);
subjectRouter.post('/', isAuth, subjectController.addSubject);
subjectRouter.put('/:id', isAuth, subjectController.updateSubjectById);
subjectRouter.delete('/:id', isAuth, subjectController.deleteSubjectById);
subjectRouter.post('/:id/logs', isAuth, subjectController.addLog);

export default subjectRouter;
