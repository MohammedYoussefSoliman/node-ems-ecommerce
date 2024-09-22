import fs from 'fs'
import path from 'path'

export const validateFolderPath = (folderPath: string) => {
  const dirname = path.dirname(folderPath)
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(folderPath, { recursive: true })
  }
}
