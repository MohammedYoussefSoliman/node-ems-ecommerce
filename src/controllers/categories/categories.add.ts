import { Request, Response } from 'express'
import { CategoriesModel } from '@models'
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
