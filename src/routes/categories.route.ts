import { Router } from 'express'

import { addCategory } from '@controllers'

export const categoryRouter = Router()

categoryRouter.post('/', addCategory)
