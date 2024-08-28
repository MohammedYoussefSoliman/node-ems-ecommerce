import { Document, ObjectId, Types } from 'mongoose'

export interface ICategory extends Document {
  name: string
  slug: string
  subCategories: Types.ObjectId[]
}

export interface ISubCategory extends Document {
  name: string
  slug: string
  category: ObjectId
}
