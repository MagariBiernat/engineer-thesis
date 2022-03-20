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
import column from "./routes/column.route"
import comments from "./routes/comments.route"

const app = express()

app.use(express.urlencoded({ limit: "16mb", extended: true }))
app.use(express.json({ limit: "16mb" }))
app.use(cors({ credentials: true, origin: true }))
app.options("*", cors)

//routes
app.use("/auth", user)
app.use("/projects", passport.authenticate("jwt", { session: false }), projects)
app.use("/column", passport.authenticate("jwt", { session: false }), column)
app.use("/tasks", passport.authenticate("jwt", { session: false }), tasks)
app.use("/comments", passport.authenticate("jwt", { session: false }), comments)

//passport
passportConfig(passport)
app.use(passport.initialize())

//Clear console
console.clear()

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
