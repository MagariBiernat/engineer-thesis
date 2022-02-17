import mongoose, { Model } from "mongoose"
import { UserInterface } from "../lib/interfaces/User.interface"

const Schema = mongoose.Schema

const UserSchema = new Schema<UserInterface, Model<UserInterface>>({
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
  lastLoggedIn: {
    type: Date,
    required: false,
  },
})

const User = mongoose.model("users", UserSchema)

export default User
