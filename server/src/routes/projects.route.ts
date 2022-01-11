require("dotenv").config()

import express from "express"

import Project from "../models/Project.model"
import decodeToken from "../lib/decodeToken"
const router = express.Router()

//get all projects for user x
router.get("/all", async (req, res) => {
  const token = req.get("authorization")!.split(" ")[1]
  const { id } = decodeToken(token)

  const exclude = {
    columns: 0,
    files: 0,
  }

  try {
    const ownerProjects = await Project.find({ owner: id }, exclude)
      .sort({ updatedAt: "desc" })
      .exec()
    const collaboratorProjects = await Project.find({
      collaborators: id,
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

//post new project
router.post("/new", async (req, res) => {
  const { name, description } = req.body

  //validate name is specified
  if (!name) {
    return res.status(400).json({ message: "No name specified" })
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
      .status(400)
      .json({ message: "Project with same name already exists" })
  } else {
    const newProject = new Project({
      name: name,
      owner: id,
      description: description,
      collaborators: [id],
    })

    newProject
      .save()
      .then(() => {
        return res.json({ message: "Project created successfully" })
      })
      .catch((err) => {
        return res.status(400).json({ message: "An error occured", err })
      })
  }
})

//delete project
router.delete("/", async (req, res) => {
  const { projectId } = req.body

  if (!projectId) {
    return res.status(400).json({
      message: "Project id not specified",
    })
  }

  Project.deleteOne({ _id: projectId }, (err) => {
    if (err) {
      return res.status(400).json({
        message: "Error while deleting project.",
      })
    } else {
      return res.json({
        message: "Project deleted.",
      })
    }
  })
})

export default router
