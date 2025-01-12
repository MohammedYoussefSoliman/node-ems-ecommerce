import { Request, Response } from 'express'
import { Model, Document } from 'mongoose'
import { asyncHandler } from '@middleware'

export const createFactory = <T extends Document>(
  model: Model<T>,
  callback?: (doc: Document<T>, req: Request) => Promise<void>
) =>
  asyncHandler(async (req: Request, res: Response) => {
    // Create a new document from the model in the Database
    const document = await model.create(req.body)
    // If there is a callback function, execute it
    if (callback) await callback(document, req)
    // Send a response back to the client
    res.status(201).json({
      data: document,
    })
  })
