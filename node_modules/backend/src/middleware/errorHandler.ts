import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const status = (err as Error & { statusCode?: number }).statusCode || 500;
  res.status(status).json({ message: (err as Error).message || 'Internal server error' });
};
