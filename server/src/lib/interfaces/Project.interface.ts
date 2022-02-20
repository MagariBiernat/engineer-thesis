import { Types } from "mongoose"
import MongoDocument from "./Document.interface"
import { UserInterface } from "./User.interface"

export interface CommentSchemaInterface extends MongoDocument {
  content: string
  commentedBy: Types.Array<Types.ObjectId> | Types.DocumentArray<UserInterface>
  likedBy: Types.Array<Types.ObjectId> | Types.DocumentArray<UserInterface>
}

export interface TaskSchemaInterface extends MongoDocument {
  title: string
  description?: string
  priority: string
  assignedTo?: Types.ObjectId | UserInterface
  comments?: Types.DocumentArray<CommentSchemaInterface>
}

export interface ColumnSchemaInterface extends MongoDocument {
  name: string
  hidden: boolean
  createdBy: Types.ObjectId | UserInterface
  tasks?: Types.DocumentArray<TaskSchemaInterface>
  comments?: Types.DocumentArray<CommentSchemaInterface>
}

export interface ProjectSchemaInterface extends MongoDocument {
  name: string
  owner: Types.ObjectId | UserInterface
  description?: string
  collaborators: Types.Array<{
    user: Types.ObjectId | UserInterface
    role: string
  }>

  background: string
  isPersonal: boolean
  files: Types.Array<{ file: Buffer; filename: string; mimetype: string }>
  columns: Types.DocumentArray<ColumnSchemaInterface>
}
