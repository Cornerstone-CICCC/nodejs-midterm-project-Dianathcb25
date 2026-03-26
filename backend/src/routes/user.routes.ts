import { Router } from 'express';
import userController from '../controllers/user.controller';
import { isAuth } from '../controllers/auth.controller';

const userRouter = Router();

userRouter.get('/', isAuth, userController.getAllUsers);
userRouter.get('/:id', isAuth, userController.getUserById);
userRouter.put('/:id', isAuth, userController.updateUserById);
userRouter.delete('/:id', isAuth, userController.deleteUserById);

export default userRouter;
