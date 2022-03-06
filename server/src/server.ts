require("dotenv").config()

import express from "express"
import cors from "cors"
import connectToDatabase from "./lib/database"
import passport from "passport"

import passportConfig from "./lib/passport"

//import routings
import user from "./routes/user.route"
import projects from "./routes/projects.route"
import tasks from "./routes/tasks.route"

const app = express()

app.use(express.urlencoded({ limit: "16mb", extended: true }))
app.use(express.json({ limit: "16mb" }))
app.use(cors({ credentials: true, origin: true }))
app.options("*", cors)

app.use((req, res, next) => {
  console.log("middleware")
  next()
})

//routes
app.use("/auth", user)
app.use("/projects", passport.authenticate("jwt", { session: false }), projects)
app.use("/tasks", passport.authenticate("jwt", { session: false }), tasks)

//passport
passportConfig(passport)
app.use(passport.initialize())

connectToDatabase()
  .then(() => {
    console.log("Connected to Database")
  })
  .then(() => {
    const PORT = 8000

    app.listen(PORT, () => {
      console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`)
    })
  })
  .catch((err) => {
    console.error(err)
  })
