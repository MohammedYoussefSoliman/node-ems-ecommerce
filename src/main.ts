import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { configEnvs } from '@utils'
import { errorHandlerMiddleware } from '@middleware'
import { categoryRouter } from '@routes'
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

app.all('*', (req, _res, next) => {
  const error = new ApiError(
    `${req.originalUrl} this destination is not found`,
    400
  )
  next(error)
})

app.use(errorHandlerMiddleware)

app.listen(process.env.PORT, () => {
  console.log(`app running at ${process.env.PORT}`)
})

export default app
