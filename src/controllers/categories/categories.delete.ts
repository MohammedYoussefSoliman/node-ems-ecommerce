import { Request, Response } from 'express'
import { asyncHandler } from '@middleware'
import { CategoriesModel } from '@models'

export const deleteCategory = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params
    const category = await CategoriesModel.findOneAndDelete({ _id: id })

    if (!category) res.status(404).json({ error: 'Category not found' })
    else res.status(200).json({ data: category })
  }
)
