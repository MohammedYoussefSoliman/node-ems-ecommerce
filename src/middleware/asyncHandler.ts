import { NextFunction, Request, Response } from 'express'

export const asyncHandler = (
  callback: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
  return (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(callback(req, res, next)).catch(next)
}
