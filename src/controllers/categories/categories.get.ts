import { Request, Response } from 'express'
import { asyncHandler } from '@middleware'
import { CategoriesModel } from '@models'

export const getCategories = asyncHandler(async (_, res: Response) => {
  res.status(200).json(res.locals.paginatedResults)
})
export const getCategory = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params

  const category = await CategoriesModel.findById({ id })

  if (!category) res.status(404).json({ error: 'Category not found' })
  else res.status(200).json({ data: category })
})
