import { Document, SchemaTimestampsConfig } from "mongoose"

export default interface MongoDocument
  extends SchemaTimestampsConfig,
    Document {
  _doc?: any
}
