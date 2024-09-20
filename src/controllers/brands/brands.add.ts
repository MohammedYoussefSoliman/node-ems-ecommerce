import { IGeneral } from '@types'
import { createFactory } from '@utils'
import { BrandsModel } from '@models'

export const addBrand = createFactory<IGeneral>(BrandsModel)
