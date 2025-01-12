import { Document, ObjectId, Types } from 'mongoose'

export interface IGeneral extends Document {
  name: string
  slug: string
}
export interface ICategory extends IGeneral {
  subCategories: Types.ObjectId[]
  image: string
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
  subCategories?: ObjectId[]
  category: ObjectId
}

export interface IUser extends Document {
  name: string
  email: string
  password: string
  role: 'user' | 'admin'
  avatar: string
  active: boolean
}
