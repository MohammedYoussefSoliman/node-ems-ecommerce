import { IUser } from '@types'
import { UserModel } from '@models'
import { createFactory } from '@utils'

export const addUser = createFactory<IUser>(UserModel)
