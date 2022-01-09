import { connect, ConnectionOptions } from "mongoose"

require("dotenv").config()

const { MONGODB_URI, MONGODB_DBNAME } = process.env

const connectToDatabase = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const options: ConnectionOptions = {
        dbName: MONGODB_DBNAME,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      }

      await connect(MONGODB_URI!, options)

      console.log("MongoDB connected")

      resolve(true)
    } catch (err: any) {
      console.error(err?.message)
      reject(err)
    }
  })
}

export default connectToDatabase
