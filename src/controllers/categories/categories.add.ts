import { Request, Response } from 'express'
import { CategoriesModel, SubCategoriesModel } from '@models'
import { asyncHandler } from '@middleware'

export const addCategory = asyncHandler(
  async (req: Request, res: Response, _next) => {
    const { name } = req.body
    const response = await CategoriesModel.create({
      name,
    })
    res.status(201).json({
      data: response,
    })
  }
)

export const addSubCategory = asyncHandler(
  async (req: Request, res: Response, _next) => {
    const { name, category } = req.body
    const response = await SubCategoriesModel.create({
      name,
      category,
    })
    await CategoriesModel.findByIdAndUpdate(category, {
      $push: { subCategories: response._id },
    })

    res.status(201).json({
      data: response,
    })
  }
)
