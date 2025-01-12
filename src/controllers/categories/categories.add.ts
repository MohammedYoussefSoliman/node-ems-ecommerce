import { ICategory, ISubCategory } from '@types'
import { createFactory } from '@utils'
import { CategoriesModel, SubCategoriesModel } from '@models'

export const addCategory = createFactory<ICategory>(CategoriesModel)

export const addSubCategory = createFactory<ISubCategory>(
  SubCategoriesModel,
  async (document, req) => {
    const { category } = req.body
    await CategoriesModel.findByIdAndUpdate(category, {
      $push: { subCategories: document._id },
    })
  }
)
