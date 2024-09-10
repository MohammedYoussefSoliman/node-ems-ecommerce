import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { configEnvs } from '@utils'
import { errorHandlerMiddleware } from '@middleware'
import {
  categoryRouter,
  subCategoryRouter,
  brandsRouter,
  productsRouter,
} from '@routes'
import { connectDB } from '@configs'
import { ApiError } from '@types'

configEnvs()
connectDB()

const app = express()
app.use(express.json())
// deals with security issues
app.use(helmet())
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 20,
    standardHeaders: true,
    message: 'Too many requests',
  })
)
// http logger middleware
app.use(morgan('common'))

app.use('/api/v1/categories', categoryRouter)
app.use('/api/v1/brands', brandsRouter)
app.use('/api/v1/products', productsRouter)
app.use('/api/v1/sub-categories', subCategoryRouter)

app.all('*', (req, _res, next) => {
  const error = new ApiError(
    `${req.originalUrl} this destination is not found`,
    400
  )
  next(error)
})

app.use(errorHandlerMiddleware)

const server = app.listen(process.env.PORT, () => {
  console.log(`app running at ${process.env.PORT}`)
})

process.on('uncaughtException', error => {
  console.log(`${error.name}: ${error.message}`)
  server.close(() => {
    console.log('shutting down...')
    process.exit(1)
  })
})

export default app
