import { Schema, model, Types, Query } from 'mongoose'
import { ICategory } from '@types'
import { setImageUrl } from '@utils'
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
    image: {
      type: String,
    },
    subCategories: [
      {
        type: Types.ObjectId,
        ref: 'SubCategory',
      },
    ],
  },
  {
    timestamps: true,
  }
)

categoriesSchema.pre('save', async function (next) {
  this.slug = slugify(this.name, { lower: true })
  next()
})

categoriesSchema.pre<Query<ICategory, ICategory>>(
  /^find/,
  async function (next) {
    this.populate([
      {
        path: 'subCategories',
        select: 'name -_id',
      },
    ])
    next()
  }
)

categoriesSchema.post('init', function (doc) {
  setImageUrl<ICategory>(doc, 'categories')
})
categoriesSchema.post('save', function (doc) {
  setImageUrl<ICategory>(doc, 'categories')
})

export const CategoriesModel = model<ICategory>('Category', categoriesSchema)
