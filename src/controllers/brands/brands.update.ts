import { Request, Response } from 'express'
import slugify from 'slugify'
import { asyncHandler } from '@middleware'
import { BrandsModel } from '@models'

export const updateBrand = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params
  const name = req.body.name

  const brand = await BrandsModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  )

  if (!brand) res.status(404).json({ error: 'Brand not found' })
  else res.status(201).json({ data: brand })
})
