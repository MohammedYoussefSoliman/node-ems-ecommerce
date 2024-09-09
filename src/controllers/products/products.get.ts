import { NextFunction, Request, Response } from 'express'
import { asyncHandler } from '@middleware'
import { ProductsModel } from '@models'
import { ApiError } from '@types'

export const getProducts = asyncHandler(async (_, res: Response) => {
  res.status(200).json(res.locals.paginatedResults)
})

export const getProduct = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params

    const product = await ProductsModel.findById({ _id: id })

    if (!product)
      next(new ApiError(`Product with reference id ${id} is not found`, 404))
    res.status(200).json({ data: product })
  }
)
