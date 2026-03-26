import { Request, Response } from 'express';
import userModel from '../models/user.model';
import { User } from '../types/user.types';
import zxcvbn from 'zxcvbn';

const register = async (
  req: Request<{}, {}, Omit<User, 'id'>>,
  res: Response,
) => {
  const { fullname, username, password } = req.body;

  if (!fullname?.trim() || !username?.trim() || !password?.trim()) {
    res.status(400).json({ error: 'All fields are required.' });
    return;
  }

  const passwordScore = zxcvbn(password).score;
  if (passwordScore <= 2) {
    res.status(400).json({
      error: 'Password is too weak. Try a longer or more complex password.',
    });
    return;
  }

  const newUser = await userModel.add(fullname, username, password);
  if (!newUser) {
    res.status(409).json({ error: 'Username is already taken.' });
    return;
  }

  res.cookie('userId', newUser.id, { maxAge: 60 * 60 * 1000, httpOnly: true });
  res.cookie('username', newUser.username, {
    maxAge: 60 * 60 * 1000,
    httpOnly: true,
  });

  res.status(201).json({
    id: newUser.id,
    fullname: newUser.fullname,
    username: newUser.username,
  });
};

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username?.trim() || !password?.trim()) {
    res.status(400).json({ error: 'Username and password are required.' });
    return;
  }

  const user = await userModel.login(username, password);
  if (!user) {
    res.status(401).json({ error: 'Invalid username or password.' });
    return;
  }

  res.cookie('userId', user.id, { maxAge: 60 * 60 * 1000, httpOnly: true });
  res.cookie('username', user.username, {
    maxAge: 60 * 60 * 1000,
    httpOnly: true,
  });

  res.status(200).json({
    id: user.id,
    fullname: user.fullname,
    username: user.username,
  });
};

const getAllUsers = (req: Request, res: Response) => {
  const users = userModel.findAll();
  res.status(200).json(users);
};

const getUserById = (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const user = userModel.findById(id);
  if (!user) {
    res.status(404).json({ error: 'User not found!' });
    return;
  }
  const { password, ...safeUser } = user;
  res.status(200).json(safeUser);
};

const updateUserById = async (
  req: Request<{ id: string }, {}, Partial<User>>,
  res: Response,
) => {
  const { id } = req.params;

  if (req.body.password) {
    const passwordScore = zxcvbn(req.body.password).score;
    if (passwordScore <= 2) {
      res.status(400).json({ error: 'Password is too weak!' });
      return;
    }
  }

  const result = await userModel.update(id, req.body);
  if (result === 'taken') {
    res.status(409).json({ error: 'Username is already taken.' });
    return;
  }
  if (!result) {
    res.status(404).json({ error: 'User not found!' });
    return;
  }
  const { password, ...safeUser } = result;
  res.status(200).json(safeUser);
};

const deleteUserById = (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const isDeleted = userModel.deleteById(id);
  res.status(200).json({ isSuccess: isDeleted });
};

export default {
  register,
  login,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
