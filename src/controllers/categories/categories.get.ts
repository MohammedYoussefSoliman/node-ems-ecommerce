import { Response } from 'express'
import { CategoriesModel } from '@models'
import { asyncHandler } from '@middleware'

export const getCategories = asyncHandler(async (_, res: Response) => {
  const response = await CategoriesModel.find()
  res.status(200).json({
    results: response.length,
    data: response,
  })
})
