import { connect } from 'mongoose'

export const connectDB = async () => {
  connect(process.env.DB_URL)
    .then(connection => {
      console.log(`Database connected: ${connection.connection.host}`)
    })
    .catch(error => {
      console.log(error)
      process.exit(1)
    })
}
