import { Request, Response } from 'express'
import slugify from 'slugify'
import { asyncHandler } from '@middleware'
import { ProductsModel } from '@models'

export const updateProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const title = req.body.title
    if (title) {
      req.body.slug = slugify(title)
    }

    const product = await ProductsModel.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    )

    if (!product) res.status(404).json({ error: 'Product not found' })
    else res.status(201).json({ data: product })
  }
)
