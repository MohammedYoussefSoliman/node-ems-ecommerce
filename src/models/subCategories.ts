import { Schema, model, Types } from 'mongoose'
import { ISubCategory } from '@types'
import slugify from 'slugify'

const subCategoriesSchema = new Schema<ISubCategory>(
  {
    name: {
      type: String,
      required: [true, 'subCategory name is required'],
      unique: true,
      minlength: [3, 'subCategory name is required'],
      maxlength: [64, 'subCategory name is required'],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    category: {
      type: Types.ObjectId,
      ref: 'Category',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

subCategoriesSchema.pre('save', async function (next) {
  this.slug = slugify(this.name, { lower: true })
  next()
})

export const SubCategoriesModel = model<ISubCategory>(
  'SubCategory',
  subCategoriesSchema
)
