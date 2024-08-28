import { Request, Response } from 'express'
import { BrandsModel } from '@models'
import { asyncHandler } from '@middleware'

export const addBrand = asyncHandler(
  async (req: Request, res: Response, _next) => {
    const { name } = req.body
    const response = await BrandsModel.create({
      name,
    })
    res.status(201).json({
      data: response,
    })
  }
)
