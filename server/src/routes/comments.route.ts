require("dotenv").config()

import express, { Request } from "express"
import { body, param, validationResult } from "express-validator"
import mongoose, { ObjectId } from "mongoose"
import Task from "../models/Task.model"
import Comment from "../models/Comment.model"
import getUserIdMiddleware from "../lib/middleware/getUserId"

const router = express.Router()

//get all comments for taskId
router.get(
  "/:taskId",
  param("taskId", "Task ID was not specified").exists(),
  async (req: Request, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res
        .status(406)
        .json({ message: "No name specified", errors: errors.array() })
    }

    const { taskId } = req.params

    const id = mongoose.Types.ObjectId(taskId)

    const includeConfig = { include: "comments" }

    try {
      const comments = await Task.findById(id, includeConfig)
        .populate("comments")
        .exec()

      return res.json(comments)
    } catch (err) {
      return res.status(500).json({ message: "Error has occurred", error: err })
    }
  }
)

router.post(
  "/",
  getUserIdMiddleware,
  body("content", "Content must be specified").exists(),
  body("taskId", "Task ID must be specified").exists(),
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res
        .status(406)
        .json({ message: "No name specified", errors: errors.array() })
    }

    const { content, taskId } = req.body

    const id = res.locals.id as ObjectId

    try {
      const newComment = await Comment.create({
        content,
        commentedBy: id,
        likedBy: [],
      })

      await Task.findByIdAndUpdate(taskId, {
        $push: {
          comments: newComment,
        },
      })

      return res.json({ message: "Success" })
    } catch (err) {
      return res.status(500).json({ message: "Error occurred", error: err })
    }
  }
)

router.delete(
  "/",
  getUserIdMiddleware,
  body("commentId", "Comment ID must be specified").exists(),
  body("taskId", "Task ID must be specified").exists(),
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res
        .status(406)
        .json({ message: "No name specified", errors: errors.array() })
    }

    const { commentId, taskId } = req.body

    try {
      await Comment.findByIdAndDelete(commentId)
      await Task.findByIdAndUpdate(taskId, {
        $pull: {
          comments: commentId,
        },
      })
      return res.json({ message: "Success" })
    } catch (err) {
      return res.status(500).json({ message: "Error occurred", error: err })
    }
  }
)

export default router
