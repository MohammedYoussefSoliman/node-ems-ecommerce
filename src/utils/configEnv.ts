import * as dotenv from 'dotenv'

const configEnvs = (
  path: string = '.env',
  options?: Omit<dotenv.DotenvConfigOptions, 'path'>
): dotenv.DotenvConfigOutput => dotenv.config({ path, ...options })

export default configEnvs
