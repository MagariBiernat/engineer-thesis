export interface userInterface {
  _id: string
  fullName: string
  profilePicture: string
}

export interface commentsInterface {
  _id: string
  content: string
  commentedBy: userInterface
  likedBy: userInterface[]
  createdAt: Date
}

export interface taskInterface {
  _id: string
  title: string
  description: string
  priority: string
  assignedTo: userInterface
  comments: commentsInterface[]
}

export interface columnInterface {
  _id: string
  name: string
  createdBy: string
  hidden: boolean
  tasks: taskInterface[]
}

export interface projectInterface {
  name: string
  background: string
  description: string
  _id: string
  collaborators: Array<userInterface>
  owner: userInterface | string
  //todo files interface
  files: Array<string>
  isPersonal: boolean
  updatedAt: Date
  columns?: columnInterface[]
}

export interface allProjectsFetchInterface {
  data: {
    owner: projectInterface[]
    collaborator: projectInterface[]
  }
}
