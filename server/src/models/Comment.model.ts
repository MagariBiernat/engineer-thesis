import mongoose, { Model, Schema } from "mongoose"
import { CommentSchemaInterface } from "../lib/interfaces/Project.interface"

const CommentSchema = new Schema<
  CommentSchemaInterface,
  Model<CommentSchemaInterface>
>(
  {
    content: {
      type: String,
      required: true,
    },

    commentedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    likedBy: [
      { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    ],
  },
  { timestamps: true }
)

const Comment = mongoose.model<CommentSchemaInterface>(
  "comments",
  CommentSchema
)

export default Comment
