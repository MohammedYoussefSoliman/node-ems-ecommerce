import { Request, Response } from 'express'
import { Model, Document } from 'mongoose'
import { asyncHandler } from '@middleware'

export const createFactory = <T extends Document>(
  model: Model<T>,
  callback?: (doc: Document<T>, req: Request) => Promise<void>
) =>
  asyncHandler(async (req: Request, res: Response) => {
    const document = await model.create(req.body)
    if (callback) await callback(document, req)
    res.status(201).json({
      data: document,
    })
  })
