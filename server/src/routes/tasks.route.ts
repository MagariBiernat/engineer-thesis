require("dotenv").config()

import express from "express"
import { body, param, validationResult } from "express-validator"
import { ProjectSchemaInterface } from "../lib/interfaces/Project.interface"
import authorizeRole from "../lib/middleware/authorizeRole"
import Column from "../models/Column.model"
import Task from "../models/Task.model"
import mongoose from "mongoose"
const router = express.Router()

router.get(
  "/:projectId/:taskId",
  param("taskId", "Task's ID not specified").exists(),

  async (req: express.Request, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res
        .status(406)
        .json({ message: "No name specified", errors: errors.array() })
    }

    const { taskId } = req.params

    const id = mongoose.Types.ObjectId(taskId)
    try {
      const task = await Task.findById(id).populate([
        { path: "comments", model: "comments" },
        { path: "comments", populate: { path: "commentedBy", model: "users" } },
      ])

      return res.json(task)
    } catch (err) {
      return res.status(500).json({ message: "Error occurred", error: err })
    }
  }
)

router.post(
  "/",
  body("title").isString().isLength({ min: 1 }),
  body("columnId").isString().exists(),
  body("priority").exists(),
  authorizeRole,
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res
        .status(406)
        .json({ message: "No name specified", errors: errors.array() })
    }

    const { title, columnId, description, priority } = req.body

    const columnToUpdate = await Column.findById(columnId)

    if (!columnToUpdate) return res.status(500).json({ message: "Error" })

    try {
      const newTask = await Task.create({
        title,
        description,
        priority,
      })

      columnToUpdate.tasks?.push(newTask)
      await columnToUpdate.save()
      return res.json({ message: "Successfully added task" })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: "Error", err })
    }
  }
)

router.post(
  "/reorderColumns",
  body("columnId", "Column ID must be specified").exists(),
  body("sourceIndex", "Source ID must be specified").exists(),
  body("destinationIndex", "Destination ID must be specified").exists(),
  authorizeRole,
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(406).json({ message: "Errors", errors: errors.array() })
    }
    const { columnId, sourceIndex, destinationIndex } = req.body

    const project = res.locals.project as ProjectSchemaInterface

    try {
      const columnToMove = project.columns.find((i) => i._id == columnId)
      if (!columnToMove) return res.status(500).json({ message: "Error" })

      let colsReordered = project.columns
      colsReordered.splice(sourceIndex, 1)
      colsReordered.splice(destinationIndex, 0, columnToMove)

      project.columns = colsReordered

      console.log(colsReordered)
      await project.updateOne({
        $set: {
          columns: colsReordered,
        },
      })
      return res.json({ message: "Success" })
    } catch (err) {
      return res.status(500).json({ message: "Error occurred" })
    }
  }
)

router.post(
  "/reorderTask",
  body("taskId", "Task ID must be specified").exists(),
  body("sourceColumnId", "Column ID must be specified").exists(),
  body("sourceIndex", "Source Index must be specified").exists(),
  body("destinationIndex", "Destination Index must be specified").exists(),
  authorizeRole,
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(406).json({ message: "Errors", errors: errors.array() })
    }

    const {
      sourceColumnId,
      destinationColumnId = "",
      sourceIndex,
      destinationIndex,

      taskId,
    } = req.body as {
      sourceColumnId: string
      destinationColumnId: string
      sourceIndex: number
      destinationIndex: number
      taskId: string
    }

    const project = res.locals.project as ProjectSchemaInterface

    try {
      if (destinationColumnId) {
        let sourceColumn = await Column.findById(sourceColumnId)
          .populate("tasks")
          .exec()
        let destinationColumn = await Column.findById(destinationColumnId)
          .populate("tasks")
          .exec()

        if (!sourceColumn || !destinationColumn) return res.status(500).json({})
        const copiedItems = sourceColumn.tasks
        const destinationCopiedItems = destinationColumn.tasks

        const [removed] = copiedItems!.splice(sourceIndex, 1)

        destinationCopiedItems!.splice(destinationIndex, 0, removed)

        await sourceColumn
          .updateOne({
            $set: {
              tasks: copiedItems,
            },
          })
          .then(async () => {
            await destinationColumn!.updateOne({
              $set: {
                tasks: destinationCopiedItems,
              },
            })
          })
      } else {
        let sourceColumn = await Column.findById(sourceColumnId)
          .populate("tasks")
          .exec()

        if (!sourceColumn) return res.status(500).json({})

        let copiedItems = sourceColumn.tasks!
        const [removed] = copiedItems.splice(sourceIndex, 1)

        copiedItems!.splice(destinationIndex, 0, removed)

        await sourceColumn.updateOne({ $set: { tasks: copiedItems } })
      }

      return res.json({ message: "Success" })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ message: "Error", error: err })
    }
  }
)

router.put(
  "/assign",
  body("userId", "User ID not specified").exists(),
  authorizeRole,
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(406).json({ message: "Errors", errors: errors.array() })
    }
  }
)

//update reordered tasks

router.delete(
  "/",
  body("taskId", "Task ID not specified"),
  authorizeRole,
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(406).json({ message: "Errors", errors: errors.array() })
    }
  }
)

export default router
