import { MongoClient, ServerApiVersion } from 'mongodb'

const uri = process.env.MONGO_URI

if (!uri) {
  console.error(
    'Please define the MONGO_URI environment variable inside .env.local',
  )
  process.exit(1)
}

export const client = await new MongoClient(uri, {
  appName: process.env.package_name,
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
}).connect()
