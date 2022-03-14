require("dotenv").config()

import express from "express"
import User from "../models/User.model"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { body, validationResult } from "express-validator"

const router = express.Router()
const SECRET_KEY = process.env.SECRET_KEY

router.post(
  "/login",
  body("email", "Email is wrong").isEmail().exists(),
  body("password", "Password is wrong").exists(),
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(406).json({ message: "Errors", errors: errors.array() })
    }

    const { email, password } = req.body

    User.findOne({ email }).then((user: any) => {
      if (!user) {
        return res
          .status(400)
          .json({ wrongCredentials: "Email or password incorrect" })
      }

      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          const payload = {
            id: user._id,
            email: user.email,
          }

          jwt.sign(
            payload,
            SECRET_KEY!,
            {
              expiresIn: 86400, // 1 day in seconds
            },
            (err, token) => {
              if (err) {
                return res
                  .status(400)
                  .json({ error: err, message: "Problem with receiving token" })
              }

              return res.json({
                success: true,
                _id: user._id,
                fullName: user.fullName,
                token: "Bearer " + token,
                profilePicture: user.profilePicture,
              })
            }
          )
        } else {
          return res
            .status(400)
            .json({ message: "Email or password incorrect " })
        }
      })
    })
  }
)
router.post(
  "/signup",
  body("fullName", "Full name can't be empty").exists(),
  body("email", "Email can't be empty").isEmail(),
  body("password", "Password can't be empty").exists(),
  body("password2", "Passwords must match")
    .exists()
    .custom((val, { req }) => val === req.body.password),
  body("gender", "Gender can't be empty").exists(),
  async (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(406).json({ message: "Errors", errors: errors.array() })
    }

    User.findOne({ email: req.body.email }).then(async (user: any) => {
      if (user) {
        return res.status(401).json({ email: "Email already exists" })
      } else {
        const salt = await bcrypt.genSalt(10)

        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const newUser = new User({
          fullName: req?.body?.fullName,
          email: req?.body?.email,
          password: hashedPassword,
          gender: req?.body?.gender,
          profilePicture: req?.body?.profilePicture
            ? req?.body?.profilePicture
            : "none",
        })

        newUser
          .save()
          .then((user) => {
            const { _id, email, fullName, profilePicture } = user as any

            const payload = {
              id: _id,
              email: email,
            }

            jwt.sign(
              payload,
              SECRET_KEY!,
              {
                expiresIn: 86400, // 1 day in seconds
              },
              (err, token) => {
                if (err) {
                  return res.status(403).json({
                    error: err,
                    message: "Problem with receiving token",
                  })
                }

                return res.json({
                  success: true,
                  _id: _id,
                  fullName: fullName,
                  token: "Bearer " + token,
                  profilePicture: profilePicture,
                })
              }
            )
          })
          .catch((err) => {
            return res.status(500).json({
              error: err,
              message: "Problem occurred while saving document to database",
            })
          })
      }
    })
  }
)

export default router
