import multer from 'multer'
import { v4 as uuid4 } from 'uuid'
import { ICategory, ISubCategory, ApiError } from '@types'
import { createFactory, validateFolderPath } from '@utils'
import { CategoriesModel, SubCategoriesModel } from '@models'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    validateFolderPath('uploads/categories')
    cb(null, 'uploads/categories')
  },
  filename: function (req, file, cb) {
    const fileExtension = file.mimetype.split('/')[1]
    const fileName = `category-${uuid4()}-${Date.now()}.${fileExtension}`
    cb(null, fileName)
  },
})
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
