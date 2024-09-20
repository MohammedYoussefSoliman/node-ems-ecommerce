import { ICategory, ISubCategory } from '@types'
import { deleteFactory } from '@utils'
import { CategoriesModel, SubCategoriesModel } from '@models'

export const deleteCategory = deleteFactory<ICategory>(CategoriesModel)
export const deleteSubCategory = deleteFactory<ISubCategory>(SubCategoriesModel)
