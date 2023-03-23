import 'module-alias/register'
import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { configEnvs } from '@utils/index'
import { errorHandlerMiddleware } from '@middleware/index'

configEnvs()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 20,
    standardHeaders: true,
    message: 'Too many requests',
  })
)
app.use(morgan('common'))

app.get('/', (req, res) => {
  res.json({
    message: 'hello world',
  })
})
app.post('/', (req, res) => {
  console.log(req.body)
  res.json({
    message: 'hello from post',
    data: req.body,
  })
})

app.use(errorHandlerMiddleware)

app.listen(process.env.PORT, () => {
  console.log(`app running at ${process.env.PORT}`)
})

export default app
