import { Request, Response } from 'express'
import { asyncHandler } from '@middleware'
import { BrandsModel } from '@models'

export const deleteBrand = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const category = await BrandsModel.findOneAndDelete({ _id: id })

  if (!category) res.status(404).json({ error: 'Brand not found' })
  else res.status(200).json({ data: category })
})
