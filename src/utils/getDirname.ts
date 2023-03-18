import path from 'path'
import { fileURLToPath } from 'url'

const getDirname = (metaUrl: string): string => {
  const _filename = fileURLToPath(metaUrl)
  return path.dirname(_filename)
}

export default getDirname
