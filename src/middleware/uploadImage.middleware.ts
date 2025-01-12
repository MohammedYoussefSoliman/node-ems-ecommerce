import multer, { memoryStorage } from 'multer'
import sharp from 'sharp'
import { v4 as uuid4 } from 'uuid'
import { ApiError } from '@types'
import { asyncHandler } from '@middleware/asyncHandler'
import { validateFolderPath } from '@utils'

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

type MulterField = {
  name: string
  maxCount: number
}

const storage = memoryStorage()
const upload = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
      cb(null, true)
    } else {
      const error = new ApiError('Only images are allowed', 400) as Error
      cb(error)
    }
  },
})

export const uploadImage = upload.single('image')

export const uploadMultipleImages = (
  name: string = 'image',
  maxCount: number
) => upload.array(name, maxCount)

export const uploadMixFields = (fields: MulterField[]) => upload.fields(fields)

export const processSingleImage = (module: string) =>
  asyncHandler(async (req, _res, next) => {
    if (req.file) {
      const fileBuffer = req.file?.buffer
      const fileName = `${module}-${uuid4()}-${Date.now()}.jpeg`
      await sharp(fileBuffer)
        .resize(200, 200)
        .toFormat('jpeg')
        .toFile(`uploads/${module}/${fileName}`)
      req.body.image = fileName
    }

    next()
  })

export const processMixImage = (fields: MulterField[], module: string) =>
  asyncHandler(async (req, _res, next) => {
    validateFolderPath(`uploads/${module}`)
    if (req.files) {
      fields.map(async field => {
        if (req.files[field.name]) {
          await Promise.all(
            req.files[field.name].map(
              async (file: Express.Multer.File, index: number) => {
                const fileName = `${module}-${uuid4()}-${Date.now()}-${
                  field.name
                }-${index}.jpeg`

                await sharp(file.buffer)
                  .resize(2000, 1333)
                  .toFormat('jpeg')
                  .jpeg({ quality: 95 })
                  .toFile(`uploads/${module}/${fileName}`)

                if (req.files[field.name].length === 1) {
                  req.body[field.name] = fileName
                } else {
                  req.body[field.name] = []
                  req.body[field.name].push(fileName)
                }
              }
            )
          )
        }
      })
    }

    next()
  })
