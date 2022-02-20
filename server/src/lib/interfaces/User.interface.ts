import MongoDocument from "./Document.interface"

export interface UserInterface extends MongoDocument {
  fullName: string
  email: string
  password: string
  gender: string
  profilePicture: string
  lastLoggedIn: Date
}
