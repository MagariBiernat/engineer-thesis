require("dotenv").config()

import express from "express"
import User from "../models/User.model"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import validateLoginInput from "../lib/validators/validateLoginInput"
import validateRegisterInput from "../lib/validators/validateRegisterInput"

const router = express.Router()
const SECRET_KEY = process.env.SECRET_KEY

router.post("/login", async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body)
  console.log(req.body)
  if (!isValid) {
    return res.status(400).json(errors)
  }

  const { email, password } = req.body

  User.findOne({ email }).then((user: any) => {
    if (!user) {
      return res
        .status(400)
        .json({ wrongCredentials: "Email or password incorrect" })
    }

    console.log(user)

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
        return res.status(400).json({ message: "Email or password incorrect " })
      }
    })
  })
})
router.post("/signup", async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  console.log(req.body)

  User.findOne({ email: req.body.email }).then(async (user: any) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" })
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
                return res
                  .status(400)
                  .json({ error: err, message: "Problem with receiving token" })
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
          return res.status(400).json({
            error: err,
            message: "Problem occured while saving document to database",
          })
        })
    }
  })
})

export default router
// router.get()
