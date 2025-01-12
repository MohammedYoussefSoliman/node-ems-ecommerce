/* eslint-disable @typescript-eslint/ban-types */
import { Document, Types, FlatRecord } from 'mongoose'

type Doc<T extends { image: string }> = Document<unknown, {}, FlatRecord<T>> &
  FlatRecord<T> & {
    _id: Types.ObjectId
  }

export const setImageUrl = <T extends { image: string }>(
  doc: Doc<T>,
  modelName: string
) => {
  if (doc.image)
    doc.image = `${process.env.BASE_URL}uploads/${modelName}/${doc.image}`
  return doc
}
