import { Request, Response, NextFunction } from 'express';

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.path}`);
  next();
};
import { ErrorRequestHandler } from 'express';

export const errHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error('Uncaught exception:', err);
  res.status(500).send('Oops, an unexpected error occurred, please try again');
  next();
};
