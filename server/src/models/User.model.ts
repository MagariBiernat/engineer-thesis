import mongoose from "mongoose"

const Schema = mongoose.Schema

const UserSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    immutable: true,
  },
  password: {
    type: String,
    required: true,
    immutable: true,
  },
  gender: {
    type: String,
    required: true,
    immutable: false,
  },
  profilePicture: {
    type: String,
    default: "none",
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  lastLoggedIn: {
    type: Date,
    required: false,
  },
})

const User = mongoose.model("users", UserSchema)

export default User
