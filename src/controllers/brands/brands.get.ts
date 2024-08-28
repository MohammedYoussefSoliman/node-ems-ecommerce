import { NextFunction, Request, Response } from 'express'
import { asyncHandler } from '@middleware'
import { BrandsModel } from '@models'
import { ApiError } from '@types'

export const getBrands = asyncHandler(async (_, res: Response) => {
  res.status(200).json(res.locals.paginatedResults)
})

export const getBrand = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params

    const brand = await BrandsModel.findById({ _id: id })

    if (!brand)
      next(new ApiError(`Brand with reference id ${id} is not found`, 404))
    res.status(200).json({ data: brand })
  }
)
