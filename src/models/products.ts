import { Schema, model, Types, Query } from 'mongoose'
import { IProduct } from '@types'
import slugify from 'slugify'

const productsSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: [true, 'product title is required'],
      unique: true,
      trim: true,
      minlength: [3, 'product title is too short'],
      maxlength: [100, 'product title is too long'],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'product description is required'],
      minlength: [10, 'product description is too short'],
      maxlength: [1000, 'product description is too long'],
    },
    price: {
      type: Number,
      required: [true, 'product price is required'],
      min: [1, 'product price can not be negative'],
      max: [1000000, 'product price can not be greater than 1000000'],
    },
    quantity: {
      type: Number,
      required: [true, 'product quantity is required'],
    },
    sold: {
      type: Number,
      default: 0,
    },
    priceAfterDiscount: {
      type: Number,
    },
    images: {
      type: [String],
      default: [],
    },
    coverImage: {
      type: String,
      required: [true, 'product cover image is required'],
    },
    colors: {
      type: [String],
      default: [],
    },
    rating: {
      type: Number,
      min: [1, 'product rating can not be less than 1'],
      max: [5, 'product rating can not be greater than 5'],
    },
    ratingQuantity: {
      type: Number,
      default: 0,
    },
    category: {
      type: Types.ObjectId,
      ref: 'Category',
      required: [true, 'product category is required'],
    },
    subCategories: [
      {
        type: Types.ObjectId,
        ref: 'SubCategory',
      },
    ],
    brand: {
      type: Types.ObjectId,
      ref: 'Brand',
      required: [true, 'product category is required'],
    },
  },
  {
    timestamps: true,
  }
)

productsSchema.pre('save', async function (next) {
  this.slug = slugify(this.title, { lower: true })
  next()
})
productsSchema.pre<Query<IProduct, IProduct>>(/^find/, async function (next) {
  this.populate([
    {
      path: 'category',
      select: 'name -_id',
    },
    {
      path: 'brand',
      select: 'name -_id',
    },
    {
      path: 'subCategories',
      select: 'name -_id',
    },
  ])
  next()
})

export const ProductsModel = model<IProduct>('Product', productsSchema)
