import { Router } from 'express'

import { addCategory, getCategories } from '@controllers'

export const categoryRouter = Router()

categoryRouter.get('/', getCategories).post('/', addCategory)
