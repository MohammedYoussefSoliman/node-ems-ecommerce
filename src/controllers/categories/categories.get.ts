import { CategoriesModel, SubCategoriesModel } from '@models'
import { ICategory, ISubCategory } from '@types'
import { getFactory, getSingleFactory } from '@utils'

export const getCategories = getFactory()

export const getCategory = getSingleFactory<ICategory>(CategoriesModel)

export const getSubCategories = getFactory()

export const getSubCategory = getSingleFactory<ISubCategory>(SubCategoriesModel)
