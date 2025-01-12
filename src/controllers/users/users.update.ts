import { IUser } from '@types'
import { updateFactory } from '@utils'
import { UserModel } from '@models'

export const updateUser = updateFactory<IUser>(UserModel)
