import { Router, Request, Response } from 'express';
import userModel from '../models/user.model';

const pageRouter = Router();

pageRouter.get('/auth-check', (req: Request, res: Response) => {
  const { userId } = req.cookies;

  if (!userId) {
    res.status(401).json({ error: 'Session expired or not found.' });
    return;
  }
  const user = userModel.findById(userId);

  if (!user) {
    res.status(404).json({ error: 'User not found.' });
    return;
  }
  res.status(200).json({
    id: user.id,
    fullname: user.fullname,
    username: user.username,
  });
});

pageRouter.get('/logout', (req: Request, res: Response) => {
  res.clearCookie('userId');
  res.clearCookie('username');
  res.status(200).json({ message: 'Successfully logged out of ' });
});
export default pageRouter;
