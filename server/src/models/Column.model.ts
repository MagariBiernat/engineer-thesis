import mongoose, { Model, Schema } from "mongoose"
import { ColumnSchemaInterface } from "../lib/interfaces/Project.interface"

const ColumnSchema = new Schema<
  ColumnSchemaInterface,
  Model<ColumnSchemaInterface>
>(
  {
    name: {
      type: String,
      required: true,
    },

    hidden: {
      type: Boolean,
      required: true,
      default: false,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "tasks",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comments",
      },
    ],
  },
  { timestamps: true }
)

const Column = mongoose.model<ColumnSchemaInterface>("columns", ColumnSchema)

export default Column
