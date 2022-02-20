import mongoose, { HookNextFunction, Model } from "mongoose"
import {
  ColumnSchemaInterface,
  CommentSchemaInterface,
  ProjectSchemaInterface,
  TaskSchemaInterface,
} from "../lib/interfaces/Project.interface"
const Schema = mongoose.Schema

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

const TaskSchema = new Schema<TaskSchemaInterface, Model<TaskSchemaInterface>>(
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
    comments: [CommentSchema],
  },
  { timestamps: true }
)

export const ColumnSchema = new Schema<
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
    tasks: [TaskSchema],
    comments: [CommentSchema],
  },
  { timestamps: true }
)

const ProjectSchema = new Schema<
  ProjectSchemaInterface,
  Model<ProjectSchemaInterface>
>(
  {
    name: {
      type: String,
      required: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    collaborators: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
        },
        role: {
          type: String,
          enum: ["Owner", "Moderator", "User"],
          default: "User",
        },
      },
    ],

    background: {
      type: String,
      default: "default",
    },

    isPersonal: {
      type: Boolean,
      required: true,
    },

    files: [
      {
        file: { type: Buffer, required: true },
        filename: { type: String, required: true },
        mimetype: { type: String, required: true },
      },
    ],

    columns: [ColumnSchema],
  },
  { timestamps: true }
)

ProjectSchema.pre("find", function (this: any, next: HookNextFunction) {
  this.populate("owner", ["fullName", "profilePicture"])

  next()
})

//TODO fix this' interface
ProjectSchema.pre("save", function (this: any, next: HookNextFunction) {
  if (this.isNew) {
    //owner's id
    const { owner: id } = this
    //every new project should have some default columns in it
    const defaultColumns = [
      {
        name: "Todo",
        hidden: false,
        createdBy: id,
      },
      {
        name: "In progress",
        hidden: false,
        createdBy: id,
      },
      {
        name: "Done",
        hidden: false,
        createdBy: id,
      },
    ]

    //save those default columns
    this.columns = defaultColumns

    //save
  }
  next()
})

const Project = mongoose.model<ProjectSchemaInterface>(
  "projects",
  ProjectSchema
)

export default Project
