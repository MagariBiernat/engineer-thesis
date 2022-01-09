require("dotenv").config()

import express from "express"

import Project from "../models/Project.model"
import decodeToken from "../lib/decodeToken"
const router = express.Router()

//get all projects for user x
router.get("/all", async (req, res) => {
  const token = req.get("authorization")!.split(" ")[1]
  const { id } = decodeToken(token)

  Project.find({
    $or: [
      {
        owner: id,
      },
      {
        collaborators: id,
      },
    ],
  })
    .sort({ updatedAt: "desc" })
    .exec((error: any, results: any) => {
      if (error) {
        console.log(error)
        return res.status(404).json({ message: "Error fetchin data", error })
      }

      return res.json({ data: results })
    })
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
router.delete("/")

export default router
