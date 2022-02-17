import { SchemaTimestampsConfig } from "mongoose"

export interface UserInterface extends SchemaTimestampsConfig {
  fullName: string
  email: string
  password: string
  gender: string
  profilePicture: string
  lastLoggedIn: Date
}
