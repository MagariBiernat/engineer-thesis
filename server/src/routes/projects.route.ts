require("dotenv").config()

import express from "express"

import Project from "../models/Project.model"
import decodeToken from "../lib/decodeToken"
import { Mongoose, Types } from "mongoose"
const router = express.Router()

//get all projects for user x
router.get("/", async (req, res) => {
  const token = req.get("authorization")!.split(" ")[1]
  const { id } = decodeToken(token)
  const userId = Types.ObjectId(id)

  const exclude = {
    columns: 0,
    files: 0,
  }

  try {
    const ownerProjects = await Project.find({ owner: id }, exclude)
      .sort({ updatedAt: "desc" })
      .exec()
    const collaboratorProjects = await Project.find({
      "collaborators.user": { _id: userId },
      owner: {
        $ne: id,
      },
    })
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

  //get user's id from token
  const { id } = decodeToken(req.get("authorization")!.split(" ")[1])

  try {
    const project = await Project.find({ owner: id, _id: projectId }).exec()

    if (project.length === 1) return res.json({ ...project[0]._doc })

    throw Error("!")
  } catch (err) {
    return res.status(500).json({ message: "Error while fetching data" })
  }
})

/*

406 -> name not specified
 409 -> project with this name already exists among this users' projects
 400 -> error while creating project

*/
//post new project
router.post("/", async (req, res) => {
  const { name, description, isPersonal } = req.body

  //validate name is specified
  if (!name) {
    return res.status(406).json({ message: "No name specified" })
  }

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
    const newProject = new Project({
      name: name,
      owner: id,
      description: description || "",
      collaborators: [{ user: id, role: "Owner" }],
      isPersonal: isPersonal || false,
    })

    newProject
      .save()
      .then((project) => {
        return res.json({ message: "Project created successfully", project })
      })
      .catch((err) => {
        return res.status(400).json({ message: "An error occurred", err })
      })
  }
})

//delete project
router.delete("/", async (req, res) => {
  const { projectId } = req.body

  //check if id was specified in request's body
  if (!projectId) {
    return res.status(400).json({
      message: "Project id not specified",
    })
  }

  // delete project
  Project.deleteOne({ _id: projectId }, (err) => {
    if (err) {
      //fail
      return res.status(400).json({
        message: "Error while deleting project.",
      })
    } else {
      //success
      return res.json({
        message: "Project deleted.",
      })
    }
  })
})

export default router
