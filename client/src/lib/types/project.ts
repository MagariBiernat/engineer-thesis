export interface userInterface {
  _id: string
  fullName: string
  profilePicture: string
}

export interface commentsInterface {
  content: string
  commentedBy: userInterface
  likedBy: userInterface[]
}

export interface taskInterface {
  title: string
  description: string
  priority: string
  assignedTo: userInterface
  comments: commentsInterface
}

export interface columnInterface {
  name: string
  createdBy: string
  hidden: boolean
  //TODO: interface tasks
  tasks: string[]
}

export interface projectInterface {
  name: string
  background: string
  description: string
  _id: string
  collaborators: Array<userInterface>
  owner: userInterface
  //todo files interface
  files: Array<string>
  updatedAt: Date
  columns?: columnInterface[]
}

export interface allProjectsFetchInterface {
  owner: projectInterface[]
  collaborator: projectInterface[]
}
