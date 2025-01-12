import { IUser } from '@types'
import { deleteFactory } from '@utils'
import { UserModel } from '@models'

export const deleteUser = deleteFactory<IUser>(UserModel)
