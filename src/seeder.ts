import 'colors'
import fs from 'fs'
import { configEnvs } from '@utils'
import { connectDB } from '@configs'

import { ProductsModel } from '@models'

const productsMocks = JSON.parse(
  fs.readFileSync(`${__dirname}/mocks/products.mocks.json`, 'utf-8')
)

async function importData() {
  try {
    await ProductsModel.create(productsMocks)
    console.log('seeder imported products'.green.inverse)
    process.exit()
  } catch (error) {
    console.log(error)
    console.log('seeder failed to import products'.red.inverse)
  }
}

async function destroyData() {
  try {
    await ProductsModel.deleteMany()
    console.log('seeder destroyed products'.red.inverse)
    process.exit()
  } catch (error) {
    console.log('seeder failed to destroy products'.red.inverse)
  }
}

configEnvs()
connectDB()

if (process.argv[2] === '-i') importData()
if (process.argv[2] === '-d') destroyData()
