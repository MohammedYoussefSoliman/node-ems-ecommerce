import { IUser } from '@types'
import { getFactory, getSingleFactory } from '@utils'
import { UserModel } from '@models'

export const getUsers = getFactory()
export const getUser = getSingleFactory<IUser>(UserModel)
