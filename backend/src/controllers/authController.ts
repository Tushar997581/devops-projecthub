import { Request, Response } from 'express';

export const authController = {
  login: (_req: Request, res: Response) => {
    res.json({ message: 'Auth login placeholder' });
  },
  register: (_req: Request, res: Response) => {
    res.json({ message: 'Auth register placeholder' });
  }
};
