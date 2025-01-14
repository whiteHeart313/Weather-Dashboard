import { Request, Response, NextFunction } from 'express';

function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
}

export default errorHandler;


import { ErrorRequestHandler } from 'express';

export const errHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error('Uncaught exception:', err);
  res.status(500).send('Oops, an unexpected error occurred, please try again');
};
