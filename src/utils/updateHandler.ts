import { Request, Response } from 'express'
import { Model, Document } from 'mongoose'
import { asyncHandler } from '@middleware'

export const updateFactory = <T extends Document>(model: Model<T>) =>
  asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params
    const document = await model.findByIdAndUpdate(id, req.body, { new: true })
    if (!document) res.status(404).json({ error: 'Document not found' })
    else res.status(200).json({ data: document })
  })
