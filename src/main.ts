import 'module-alias/register'
import express from 'express'
import { configEnvs } from '@utils/index'

configEnvs()
const app = express()

app.get('/', (req, res) => {
  res.json({
    message: 'hello world ',
  })
})

app.listen(process.env.PORT, () => {
  console.log(`app running at ${process.env.PORT}`)
})

export default app
