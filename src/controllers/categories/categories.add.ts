import { Request, Response } from 'express'
import { CategoriesModel } from '@models'

export const addCategory = async (req: Request, res: Response) => {
  console.log(req.body)
  try {
    const { name } = req.body
    const newCategory = new CategoriesModel({ name })
    const response = await newCategory.save()
    res.json(response)
  } catch (error) {
    res.json(error)
  }
}
