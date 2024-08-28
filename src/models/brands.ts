import { Schema, model } from 'mongoose'
import { IGeneral } from '@types'
import slugify from 'slugify'

const brandsSchema = new Schema<IGeneral>(
  {
    name: {
      type: String,
      required: [true, 'Brand name is required'],
      unique: true,
      minlength: [3, 'Brand name is required'],
      maxlength: [64, 'Brand name is required'],
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

brandsSchema.pre('save', async function (next) {
  this.slug = slugify(this.name, { lower: true })
  next()
})

export const BrandsModel = model<IGeneral>('Brand', brandsSchema)
