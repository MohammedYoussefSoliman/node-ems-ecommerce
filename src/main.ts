import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { configEnvs } from '@utils'
import { errorHandlerMiddleware } from '@middleware'
import { CategoriesModel } from '@models'
import { connectDB } from '@configs'

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

app.get('/', (req, res) => {
  res.json({
    message: 'hello world',
  })
})
app.post('/', async (req, res) => {
  console.log(req.body)
  try {
    const { name } = req.body
    const newCategory = new CategoriesModel({ name })
    const response = await newCategory.save()
    res.json(response)
  } catch (error) {
    res.json(error)
  }
})

app.use(errorHandlerMiddleware)

app.listen(process.env.PORT, () => {
  console.log(`app running at ${process.env.PORT}`)
})

export default app
