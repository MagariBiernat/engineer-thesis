require("dotenv").config()

import express, { NextFunction } from "express"

import Project, { ColumnSchema } from "../models/Project.model"
import decodeToken from "../lib/decodeToken"
import {
  ColumnSchemaInterface,
  ProjectSchemaInterface,
  TaskSchemaInterface,
} from "../lib/interfaces/Project.interface"
import authorizeRole from "../lib/middleware/authorizeRole"
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

router.post("/", authorizeRole, async (req, res) => {
  //need projectId, usersId from token, task title, description, priority
  const { title, column, description, priority } = req.body

  //validate if any required value is empty
  if (!title || !priority || !column) {
    return res.status(406).json({ message: "No name specified" })
  }

  const project = res.locals.project as ProjectSchemaInterface

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

    return res.json({ result })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Error", err })
  }
})

//new column
router.post("/column", authorizeRole, async (req, res) => {
  const { projectId, columnName } = req.body

  if (!projectId || !columnName)
    return res.status(422).json({ message: "Required fields are empty" })

  const project = res.locals.project as ProjectSchemaInterface
  const id = res.locals.id

  const newColumn: Partial<ColumnSchemaInterface> = {
    name: columnName,
    hidden: false,
    createdBy: id,
  }

  await project
    .updateOne({ $push: { columns: newColumn } })
    .then(() => res.json({ message: "Column created successfully" }))
    .catch((err) =>
      res.status(500).json({ message: "Error occurred", error: err })
    )
})

router.delete("/column", authorizeRole, async (req, res) => {
  const { projectId, columnId } = req.body

  if (!projectId || !columnId)
    return res.status(422).json({ message: "Required fields are empty" })

  const project = res.locals.project as ProjectSchemaInterface

  const column = project.columns.filter((i) => i._id === columnId)

  project
    .update({ $popAll: { columns: column } })
    .then(() => res.json({ message: "Column successfully removed" }))
    .catch((err) =>
      res.status(500).json({ message: "Error occurred", error: err })
    )
})

//update reordered tasks
router.put("/", authorizeRole, async (req, res) => {
  const { projectId, columnId, taskId } = req.body

  if (!projectId || !columnId || !taskId)
    return res.status(422).json({ message: "Required fields are empty" })
})

export default router
