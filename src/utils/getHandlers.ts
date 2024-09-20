import { NextFunction, Request, Response } from 'express'
import { Model, Document } from 'mongoose'
import { asyncHandler } from '@middleware'
import { ApiError } from '@types'

export const getFactory = () =>
  asyncHandler(async (_: Request, res: Response) => {
    res.status(200).json(res.locals.paginatedResults)
  })
export const getSingleFactory = <T extends Document>(model: Model<T>) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params

    const document = await model.findById(id)

    if (!document)
      next(new ApiError(`Document with reference id ${id} is not found`, 404))
    res.status(200).json({ data: document })
  })
