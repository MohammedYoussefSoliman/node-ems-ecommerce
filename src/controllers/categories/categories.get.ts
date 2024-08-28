import { NextFunction, Request, Response } from 'express'
import { asyncHandler } from '@middleware'
import { CategoriesModel, SubCategoriesModel } from '@models'
import { ApiError } from '@types'

export const getCategories = asyncHandler(async (_, res: Response) => {
  res.status(200).json(res.locals.paginatedResults)
})

export const getCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params

    const category = await CategoriesModel.findById({ _id: id })

    if (!category)
      next(new ApiError(`Category with reference id ${id} is not found`, 404))
    res.status(200).json({ data: category })
  }
)
export const getSubCategory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params

    const subCategory = await SubCategoriesModel.findById({ _id: id })

    if (!subCategory)
      next(
        new ApiError(`SubCategory with reference id ${id} is not found`, 404)
      )
    res.status(200).json({ data: subCategory })
  }
)
