import { check } from 'express-validator'
import slugify from 'slugify'

export const slugHandler = (name: 'name' | 'title') => {
  return check(name)
    .notEmpty()
    .custom((value, { req }) => {
      req.body.slug = slugify(value)
      return true
    })
}
