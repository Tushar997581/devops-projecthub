import { Request, Response } from 'express';

export const taskController = {
  list: (_req: Request, res: Response) => {
    res.json({ message: 'Tasks placeholder' });
  }
};
