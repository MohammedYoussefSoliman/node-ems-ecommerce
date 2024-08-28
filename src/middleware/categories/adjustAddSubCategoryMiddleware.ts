import { NextFunction, Request, Response } from 'express'

export const adjustAddSubCategoryMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { categoryId } = req.params

  if (categoryId) req.body.category = categoryId

  next()
}
