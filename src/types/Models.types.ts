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
export interface IProduct extends Document {
  title: string
  slug: string
  description: string
  price: number
  priceAfterDiscount?: number
  quantity: number
  sold: number
  rating: number
  ratingQuantity: number
  coverImage: string
  images: string[]
  colors: string[]
  brand: ObjectId
  subCategory?: ObjectId
  category: ObjectId
}
