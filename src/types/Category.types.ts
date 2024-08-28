import { Document, ObjectId, Types } from 'mongoose'

export interface IGeneral extends Document {
  name: string
  slug: string
}
export interface ICategory extends IGeneral {
  subCategories: Types.ObjectId[]
}

export interface ISubCategory extends IGeneral {
  category: ObjectId
}
