import * as dotenv from 'dotenv'

export const configEnvs = (
  path: string = '.env',
  options?: Omit<dotenv.DotenvConfigOptions, 'path'>
): dotenv.DotenvConfigOutput => dotenv.config({ path, ...options })
