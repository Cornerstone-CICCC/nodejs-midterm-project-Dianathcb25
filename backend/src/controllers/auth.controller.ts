import { Request, Response, NextFunction } from 'express';

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.cookies;
  if (!userId) {
    return res.status(401).json({
      error: 'Access denied. Please log in to manage your lab notbook.',
    });
  }
  next();
};
