import mongoose, { HookNextFunction, Model } from "mongoose"
import { ProjectSchemaInterface } from "../lib/interfaces/Project.interface"
import Column from "./Column.model"
const Schema = mongoose.Schema

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
          unique: true,
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

    columns: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "columns",
      },
    ],
  },
  { timestamps: true }
)

ProjectSchema.pre("find", function (this: any, next: HookNextFunction) {
  this.populate("owner", ["fullName", "profilePicture"])
  this

  next()
})

const Project = mongoose.model<ProjectSchemaInterface>(
  "projects",
  ProjectSchema
)

export default Project
