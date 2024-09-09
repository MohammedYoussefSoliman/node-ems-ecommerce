import { Request, Response } from 'express'
import { asyncHandler } from '@middleware'
import { ProductsModel } from '@models'

export const deleteProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await ProductsModel.findOneAndDelete({ _id: id })

    if (!product) res.status(404).json({ error: 'product not found' })
    else res.status(200).json({ data: product })
  }
)
