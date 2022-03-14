import mongoose, { Model, Schema } from "mongoose"
import { TaskSchemaInterface } from "../lib/interfaces/Project.interface"

export const TaskSchema = new Schema<
  TaskSchemaInterface,
  Model<TaskSchemaInterface>
>(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: false,
    },

    priority: {
      type: String,
      enum: ["Urgent", "High", "Normal", "Low"],
      default: "Normal",
      required: true,
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: false,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comments",
      },
    ],
  },
  { timestamps: true }
)

const Task = mongoose.model<TaskSchemaInterface>("tasks", TaskSchema, "task")

export default Task
