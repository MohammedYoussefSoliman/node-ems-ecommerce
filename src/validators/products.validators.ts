import { check } from 'express-validator'
import { validator } from '@middleware'
import { CategoriesModel, SubCategoriesModel, BrandsModel } from '@models'
import { slugHandler } from '@utils'

import { generalValidator } from './commonValidators'

const getInvalidIdes = (ides: string[], existedIdes: string[]) => {
  return ides.filter(id => !existedIdes.includes(id))
}

const createProductValidator = [
  slugHandler('title')
    .withMessage('Product title is required')
    .isLength({ min: 3 })
    .withMessage('Product title length is too short')
    .isLength({ max: 100 })
    .withMessage('Product title length is too long'),
  check('description')
    .notEmpty()
    .withMessage('Product description is required')
    .isLength({ min: 10 })
    .withMessage('Product description length is too short')
    .isLength({ max: 1000 })
    .withMessage('Product description length is too long'),
  check('price')
    .notEmpty()
    .withMessage('Product price is required')
    .isNumeric()
    .withMessage('product price must be a number')
    .isFloat({ min: 0.5 })
    .withMessage('Product price can not be negative'),
  check('priceAfterDiscount')
    .optional()
    .isNumeric()
    .withMessage('product price after discount must be a number')
    .isFloat({ min: 0.1 })
    .withMessage('Product price after discount can not be negative')
    .custom((value, { req }) => {
      if (value >= req.body.price) {
        throw new Error(
          'Product price after discount can not be bigger than product price'
        )
      }
      return true
    }),
  check('category')
    .notEmpty()
    .withMessage('Product category is required')
    .isMongoId()
    .withMessage('invalid subCategory Id')
    .custom(async value => {
      const category = await CategoriesModel.findById(value)
      if (!category) {
        return Promise.reject('invalid category Id')
      }
      return true
    }),
  check('subCategories')
    .optional()
    .isMongoId()
    .withMessage('invalid subCategory Id')
    .custom(async ides => {
      const foundSubCategories = await SubCategoriesModel.find({
        _id: { $exists: true, $in: ides },
      })
      if (foundSubCategories.length !== ides.length) {
        const invalidIdes = getInvalidIdes(
          ides,
          foundSubCategories.map(c => c._id.toString())
        )
        return Promise.reject(`invalid subCategory Ids: ${invalidIdes}`)
      }
      return true
    })
    .custom(async (ides, { req }) => {
      const selectedCategory = await CategoriesModel.findById(req.body.category)
      const categoriesSubs = selectedCategory.subCategories.map(id =>
        id.toString()
      )
      const notExistedIdes = ides.filter(id => !categoriesSubs.includes(id))

      if (notExistedIdes.length > 0) {
        return Promise.reject(
          `SubCategories Ids: ${notExistedIdes} not found in the selected category`
        )
      }

      return true
    }),
  check('brand')
    .notEmpty()
    .withMessage('Product brand is required')
    .isMongoId()
    .withMessage('invalid subCategory Id')
    .custom(async value => {
      const brand = await BrandsModel.findById(value)
      if (!brand) {
        return Promise.reject('invalid brand Id')
      }
      return true
    }),
  check('sold')
    .optional()
    .isInt({ min: 1 })
    .withMessage('sold items can not be negative'),
  check('quantity')
    .notEmpty()
    .withMessage('Product quantity is required')
    .isInt({ min: 1 })
    .withMessage('Product quantity can not be negative'),
  check('coverImage')
    .notEmpty()
    .withMessage('Product cover image is required')
    .isURL()
    .withMessage('Product cover image must be a url'),
  check('images')
    .optional()
    .isArray()
    .withMessage('Product images must be an array'),
  check('colors')
    .optional()
    .isArray()
    .withMessage('Product colors must be an array'),
  check('rating')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Product rating can not be less than 1')
    .isFloat({ max: 5 })
    .withMessage('Product rating can not be greater than 5'),
  check('ratingQuantity')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Product rating quantity can not be less than 0'),
]

export const updateProductValidator = [
  generalValidator(),
  validator,
  slugHandler('title'),
]
export const getProductValidators = [generalValidator(), validator]
export const deleteProductValidators = [generalValidator(), validator]

export const createProductValidators = [createProductValidator, validator]
