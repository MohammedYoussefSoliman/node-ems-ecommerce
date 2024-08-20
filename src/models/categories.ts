import { Schema, model } from 'mongoose'

const categoriesSchema = new Schema(
  {
    name: {
      type: String,
      require: [true, 'Category name is required'],
      unique: [true, 'Category name must be unique'],
      minlength: [3, 'Category name is required'],
      maxlength: [64, 'Category name is required'],
    },
    slug: {
      type: String,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
)

export const CategoriesModel = model('Category', categoriesSchema)
