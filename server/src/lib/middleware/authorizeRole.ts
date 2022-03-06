import { NextFunction, Request, Response } from "express"
import Project from "../../models/Project.model"
import decodeToken from "../decodeToken"

/*
	authorize middleware

	checks if user has access to specific project
	if everything is okay it passes project forward to next function
*/

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { projectId } = req.body

  if (!projectId)
    return res.status(422).json({ message: "Project's Id not specified" })

  const { id } = decodeToken(req.get("authorization")!.split(" ")[1])

  const project = await Project.findOne({ _id: projectId })

  if (!project) {
    return res.status(407).json({ message: "Project doesn't exist" })
  }

  const isUserAllowedToAddNewTask =
    project.collaborators.filter(
      (i: any) => i.user == id && (i.role === "Owner" || i.role === "Moderator")
    ).length > 0

  //this user doesn't have a permission to add task
  if (!isUserAllowedToAddNewTask) {
    return res.status(403).json({ message: "User has no permission" })
  }

  res.locals.project = project
  res.locals.id = id

  next()
}
