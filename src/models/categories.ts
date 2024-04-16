import { Schema, model } from 'mongoose'

const categoriesSchema = new Schema({
  name: String,
})

export const CategoriesModel = model('Category', categoriesSchema)
