import path from 'path'
import { fileURLToPath } from 'url'

export const getDirname = (metaUrl: string): string => {
  const _filename = fileURLToPath(metaUrl)
  return path.dirname(_filename)
}
