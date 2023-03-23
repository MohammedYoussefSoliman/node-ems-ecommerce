/* eslint-disable @typescript-eslint/no-unused-vars */
import { Response, Request, NextFunction } from 'express'
import { Error } from '@interfaces/index'

const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = error.status || 500

  res.status(status).json({
    success: false,
    status,
    message: error.message || 'Something went wrong',
    stack: process.env.NODE_ENV === 'development' ? error.stack : {},
  })
}

export default errorHandler
