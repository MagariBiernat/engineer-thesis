require("dotenv").config()

import express from "express"

import authorizeRole from "../lib/middleware/authorizeRole"
import { ProjectSchemaInterface } from "../lib/interfaces/Project.interface"
import Column from "../models/Column.model"
import { body, validationResult } from "express-validator"
const router = express.Router()

//Add new column
router.post("/", authorizeRole, async (req, res) => {
  const { columnName } = req.body

  if (!columnName)
    return res.status(422).json({ message: "Name not specified" })

  const project = res.locals.project as ProjectSchemaInterface
  const id = res.locals.id
  try {
    const newColumn = await Column.create({
      name: columnName,
      createdBy: id,
    })

    project.columns.push(newColumn)
    project.save()

    return res.json({ message: "Successfully added new column" })
  } catch (err) {
    return res.status(500).json({ message: "Error has occurred", error: err })
  }
})

// update column name
router.put(
  "/",
  body("columnId", "Column ID must be specified").exists(),
  body("columnName", "Colum name must be specified").exists().isString(),
  authorizeRole,
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res
        .status(406)
        .json({ message: "No name specified", errors: errors.array() })
    }

    const { columnId, columnName } = req.body
    try {
      await Column.findByIdAndUpdate(columnId, { name: columnName })
      return res.json({ message: "Successfully changed name" })
    } catch (err) {
      return res.status(500).json({ message: "Error has occurred", error: err })
    }
  }
)

//delete column
router.delete(
  "/",
  body("columnId", "Column ID must be specified").exists(),
  authorizeRole,
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res
        .status(406)
        .json({ message: "No name specified", errors: errors.array() })
    }

    const { columnId } = req.body

    try {
      await Column.findByIdAndDelete(columnId)
      return res.json({ message: "Column successfully deleted" })
    } catch (err) {
      return res.status(500).json({ message: "Error occurred", error: err })
    }
  }
)

export default router
