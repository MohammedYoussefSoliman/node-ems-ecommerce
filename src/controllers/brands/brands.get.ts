import { IGeneral } from '@types'
import { getFactory, getSingleFactory } from '@utils'
import { BrandsModel } from '@models'

export const getBrands = getFactory()
export const getBrand = getSingleFactory<IGeneral>(BrandsModel)
