require("dotenv").config()

import express from "express"

import Project, { ColumnSchema } from "../models/Project.model"
import decodeToken from "../lib/decodeToken"
import { ObjectId } from "mongoose"
import { TaskSchemaInterface } from "../lib/interfaces/Project.interface"
const router = express.Router()

//Create new task

/*

	@body
		projectId
		userId <- taken from token
		description - not required
    column -> name of columns in project
		priority - enum ["Urgent","High","Normal","Low"]

	CODE ERRORS: 
		406 -> Required data not specified
		407 -> Project doesn't exist !

		403 -> User has no permissions

*/

router.post("/newTask", async (req, res) => {
  console.log("im reachable")
  //need projectId, usersId from token, task title, description, priority
  const { projectId, title, column, description, priority } = req.body

  //validate if any required value is empty
  if (!projectId || !title || !priority || !column) {
    return res.status(406).json({ message: "No name specified" })
  }

  //get user's id from token
  const { id } = decodeToken(req.get("authorization")!.split(" ")[1])

  const project = await Project.findOne({ _id: projectId })

  // check if project exists

  if (!project) {
    return res.status(407).json({ message: "Project doesn't exist" })
  }

  //validate if user's id is valid for this project
  // check if user's id is in collaborators array with role Owner or Moderator

  const isUserAllowedToAddNewTask =
    project.collaborators.filter(
      (i: any) => i.user == id && (i.role === "Owner" || i.role === "Moderator")
    ).length === 1

  //this user doesn't have a permission to add task
  if (!isUserAllowedToAddNewTask) {
    return res.status(403).json({ message: "User has no permission" })
  }

  // Project.findByIdAndUpdate({_id: projectId}, {"columns.})

  //get all columns
  const columns = project.columns

  const columnToUpdate = columns.find((i) => i.name === column)

  console.log(columnToUpdate)
  if (!columnToUpdate) return res.status(500).json({ message: "Error" })

  try {
    const newTask: Partial<TaskSchemaInterface> = {
      title,
      description,
      priority,
    }

    const result = await project.updateOne(
      {
        $push: {
          "columns.$[outer].tasks": newTask,
        },
      },
      {
        arrayFilters: [{ "outer._id": columnToUpdate._id }],
      }
    )

    console.log(result)
    return res.json({ result })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Error", err })
  }

  console.log(project)
  console.log(typeof project)

  // add task
})

export default router
