import { Document } from 'mongoose'
type PaginationHandler = {
  page: number
  limit: number
}
export type PaginationResultType<T extends Document> = {
  results: number
  previous?: PaginationHandler
  next?: PaginationHandler
  data: T[]
}
