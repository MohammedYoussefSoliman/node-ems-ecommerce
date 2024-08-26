import { Response, Request, NextFunction } from 'express'
import { ApiError } from '@types'

export const errorHandlerMiddleware = (
  error: ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const status = error.statusCode || 500

  res
    ?.status(status)
    .json({
      statusText: error.status,
      status,
      message: `${error.name}: ${error.message}`,
      isOperational: error.isOperational,
      stack: process.env.NODE_ENV === 'development' ? error.stack : {},
    })
    .end()
}
