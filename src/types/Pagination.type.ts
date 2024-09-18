import { Document } from 'mongoose'
type PaginationHandler = {
  page: number
  limit: number
}
export type PaginationResultType<T extends Document> = {
  total: number
  results: number
  previous?: PaginationHandler
  next?: PaginationHandler
  data: T[]
}
