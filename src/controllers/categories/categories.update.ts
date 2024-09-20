import { ICategory, ISubCategory } from '@types'
import { updateFactory } from '@utils'
import { CategoriesModel, SubCategoriesModel } from '@models'

export const updateCategory = updateFactory<ICategory>(CategoriesModel)
export const updateSubCategory = updateFactory<ISubCategory>(SubCategoriesModel)
