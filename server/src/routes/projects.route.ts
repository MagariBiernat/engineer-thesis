require("dotenv").config()

import express from "express"

import Project from "../models/Project.model"
import decodeToken from "../lib/decodeToken"
import { Types } from "mongoose"

import Column from "../models/Column.model"
import { body, validationResult } from "express-validator"
import authorizeRole from "../lib/middleware/authorizeRole"
import User from "../models/User.model"
const router = express.Router()

//get all projects for user x
router.get("/", async (req, res) => {
  const token = req.get("authorization")!.split(" ")[1]
  const { id } = decodeToken(token)
  const userId = Types.ObjectId(id)

  const exclude = {
    files: 0,
  }

  try {
    const ownerProjects = await Project.find({ owner: id }, exclude)
      .populate("columns")
      .sort({ updatedAt: "desc" })
      .exec()
    const collaboratorProjects = await Project.find({
      "collaborators.user": { _id: userId },
      owner: {
        $ne: id,
      },
    })
      .populate("columns")
      .sort({ updatedAt: "desc" })
      .exec()

    const results = {
      owner: ownerProjects,
      collaborator: collaboratorProjects,
    }

    return res.json({ data: results })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Error while fetching data" })
  }
})

router.get("/:projectId", async (req, res) => {
  const { projectId } = req.params

  if (!projectId)
    return res.status(406).json({ message: "Something went wrong" })


  try {
    const project = await Project.findById(projectId)
      .populate([
        { path: "columns", model: "columns" },
        { path: "columns", populate: { path: "tasks", model: "tasks" } },
      ])
      .exec()

    return res.json(project)
  } catch (err) {
    return res.status(500).json({ message: "Error while fetching data" })
  }
})

//post new project
router.post(
  "/",
  body("name", "Name not specified").exists(),
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res
        .status(406)
        .json({ message: "No name specified", errors: errors.array() })
    }

    const { name, description, isPersonal } = req.body

    //get user's id from token
    const { id } = decodeToken(req.get("authorization")!.split(" ")[1])

    //check if this user already has a project with same name
    const alreadyExistsWithSameName = await Project.find({
      owner: id,
      name: name,
    }).exec()

    // if result is not empty, length > 0, return error
    if (alreadyExistsWithSameName?.length > 0) {
      return res
        .status(409)
        .json({ message: "Project with same name already exists" })
    } else {
      try {
        const todoColumn = await Column.create({
          name: "Todo",
          hidden: false,
          createdBy: id,
        })
        const progressColumn = await Column.create({
          name: "In progress",
          hidden: false,
          createdBy: id,
        })
        const doneColumn = await Column.create({
          name: "Done",
          hidden: false,
          createdBy: id,
        })

        await Project.create({
          name: name,
          owner: id,
          description: description || "",
          columns: [todoColumn, progressColumn, doneColumn],
          collaborators: [{ user: id, role: "Owner" }],
          isPersonal: isPersonal || false,
        })
        console.log("success creating project")
        return res.json({ message: "Success" })
      } catch (err) {
        return res.status(500).json({ message: " Error occurred", error: err })
      }
    }
  }
)

//update project fields
router.put(
  "/",
  body("projectId", "Project's ID must be specified").exists(),
  authorizeRole,
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res
        .status(406)
        .json({ message: "No name specified", errors: errors.array() })
    }

    const {
      projectId,
      name = "",
      description = "",
      isPersonal = "",
      background = "",
    } = req.body

    let update = {}
    name && Object.assign(update, { name })
    description && Object.assign(update, { description })
    isPersonal && Object.assign(update, { isPersonal })
    background && Object.assign(update, { background })

    try {
      await Project.findByIdAndUpdate(projectId, { $set: { ...update } })
        .then((updated) => {
          return res.json({ updated })
        })
        .catch((err) => {
          return res.status(500).json({ error: err })
        })
    } catch (err) {
      return res.status(500).json({ message: "Error occurred", error: err })
    }
  }
)

router.post(
  "/invite",
  body("email", "Email must be specified").exists(),
  authorizeRole,
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res
        .status(406)
        .json({ message: "No name specified", errors: errors.array() })
    }

    const { email, projectId } = req.body

    try {
      const userToInvite = await User.findOne({ email }).exec()

      if (!userToInvite)
        return res
          .status(404)
          .json({ message: "User with this email was not found" })

      if (res.locals.email === userToInvite.email)
        return res.status(403).json({ message: "You can't invite Yourself" })

      const projectToUpdate = await Project.findById(projectId)

      if (!projectToUpdate)
        return res.status(403).json({ message: "Project was not found" })

      const projectAlreadyContainsThisUser = await Project.find({
        $and: [{ _id: projectId }, { "collaborators.user": userToInvite }],
      })

      if (projectAlreadyContainsThisUser.length > 0)
        return res
          .status(403)
          .json({ message: "This project already contains this user" })

      await projectToUpdate
        .updateOne({
          $push: {
            collaborators: { user: userToInvite },
          },
        })
        .then((updated) => {
          return res.json(updated)
        })
        .catch((err) => {
          return res.status(500).json(err)
        })
    } catch (err) {
      return res.status(500).json({ message: "Error occurred", error: err })
    }
  }
)

//delete project

router.delete(
  "/",
  body("projectId", "Project ID must be specified"),
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res
        .status(406)
        .json({ message: "No name specified", errors: errors.array() })
    }

    const { projectId } = req.body
    try {
      await Project.findByIdAndDelete(projectId)
      return res.json()
    } catch (err) {
      return res.status(500).json({ message: "Error occurred", error: err })
    }
  }
)

export default router
