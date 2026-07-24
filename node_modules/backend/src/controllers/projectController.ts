import { Request, Response } from 'express';

export const projectController = {
  list: (_req: Request, res: Response) => {
    res.json({ message: 'Projects placeholder' });
  }
};
