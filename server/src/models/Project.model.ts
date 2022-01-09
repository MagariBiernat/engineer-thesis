import mongoose, { HookNextFunction } from "mongoose"
const Schema = mongoose.Schema

const CommentSchema = new Schema(
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

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
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
      required: true,
    },
    comments: [CommentSchema],
  },
  { timestamps: true }
)

const ColumnSchema = new Schema(
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
    default: [],
  },
  { timestamps: true }
)

const ProjectSchema = new Schema(
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        default: [],
      },
    ],

    background: {
      type: String,
      default: "default",
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
  //owner's id
  const { id } = this
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
  next()
})

const Project = mongoose.model("projects", ProjectSchema)

export default Project
