import { Request, Response } from 'express'
import { ProductsModel } from '@models'
import { asyncHandler } from '@middleware'

export const addCategory = asyncHandler(
  async (req: Request, res: Response, _next) => {
    const response = await ProductsModel.create(req.body)
    res.status(201).json({
      data: response,
    })
  }
)
