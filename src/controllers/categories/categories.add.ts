import multer from 'multer'
import sharp from 'sharp'
import { v4 as uuid4 } from 'uuid'
import { ICategory, ISubCategory, ApiError } from '@types'
import { createFactory } from '@utils'
import { CategoriesModel, SubCategoriesModel } from '@models'
import { asyncHandler } from '@middleware/asyncHandler'

// const storage = multer.diskStorage({
//   destination: function (_req, _file, cb) {
//     validateFolderPath('uploads/categories')
//     cb(null, 'uploads/categories')
//   },
//   filename: function (req, file, cb) {
//     const fileExtension = file.mimetype.split('/')[1]
//     const fileName = `category-${uuid4()}-${Date.now()}.${fileExtension}`
//     cb(null, fileName)
//   },
// })

const storage = multer.memoryStorage()
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
      cb(null, true)
    } else {
      const error = new ApiError('Only images are allowed', 400) as Error
      cb(error)
    }
  },
})

export const uploadCategoryImage = upload.single('image')

export const resizeImage = asyncHandler(async (req, _res, next) => {
  if (req.file) {
    const fileBuffer = req.file?.buffer
    const fileName = `category-${uuid4()}-${Date.now()}.jpeg`
    await sharp(fileBuffer)
      .resize(200, 200)
      .toFormat('jpeg')
      .toFile(`uploads/categories/${fileName}`)
    req.body.image = fileName
  }

  next()
})

export const addCategory = createFactory<ICategory>(CategoriesModel)

export const addSubCategory = createFactory<ISubCategory>(
  SubCategoriesModel,
  async (document, req) => {
    const { category } = req.body
    await CategoriesModel.findByIdAndUpdate(category, {
      $push: { subCategories: document._id },
    })
  }
)
