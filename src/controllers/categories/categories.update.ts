import { Request, Response } from 'express'
import slugify from 'slugify'
import { asyncHandler } from '@middleware'
import { CategoriesModel } from '@models'

export const updateCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const name = req.body.name

    const category = await CategoriesModel.findOneAndUpdate(
      { _id: id },
      { name, slug: slugify(name) },
      { new: true }
    )

    if (!category) res.status(404).json({ error: 'Category not found' })
    else res.status(201).json({ data: category })
  }
)
