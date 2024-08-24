import { Schema, model } from 'mongoose'
import { ICategory } from '@types'
import slugify from 'slugify'

const categoriesSchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      unique: true,
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

categoriesSchema.pre('save', async function (next) {
  this.slug = slugify(this.name, { lower: true })
  next()
})

export const CategoriesModel = model<ICategory>('Category', categoriesSchema)
