import { NextFunction, Request, Response } from 'express'
import { Model, Document } from 'mongoose'
import type { PaginationResultType } from '@types'

export const paginationHandler = <T extends Document>(
  model: Model<T>,
  queryFn?: (model: Model<T>, limit: number, skip: number) => Promise<T[]>
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 4
    const firstIndex = (page - 1) * limit
    const lastIndex = page * limit

    const paginatedResults: PaginationResultType<T> = { data: [], results: 0 }

    const documentCount = await model.countDocuments().exec()

    paginatedResults.results = documentCount
    if (lastIndex < documentCount) {
      paginatedResults.next = {
        page: page + 1,
        limit,
      }
    }
    if (firstIndex > 0) {
      paginatedResults.previous = {
        page: page - 1,
        limit,
      }
    }

    try {
      let results = []
      if (queryFn) {
        results = await queryFn(model, limit, firstIndex)
      } else {
        results = await model.find().limit(limit).skip(firstIndex).exec()
      }
      paginatedResults.data = results
      res.locals.paginatedResults = paginatedResults
      next()
    } catch (error) {
      res.status(400).json(error.message)
    }
  }
}
