import { Router } from 'express'

import {
  addUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
} from '@controllers'

export const usersRouter = Router()

usersRouter
  .get('/', getUsers)
  .get('/:id', getUser)
  .post('/', addUser)
  .put('/:id', updateUser)
  .delete('/:id', deleteUser)
