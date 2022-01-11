require("dotenv").config()

import passportjwt from "passport-jwt"
import mongoose = require("mongoose")

import User from "../models/User.model"

const JwtStrategy = passportjwt.Strategy
const ExtractJwt = passportjwt.ExtractJwt
const SECRET_KEY = process.env.SECRET_KEY

const opts: any = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = SECRET_KEY

export default function passportConfig(passport: {
  use: (arg0: passportjwt.Strategy) => void
}) {
  passport.use(
    new JwtStrategy(
      opts,
      (jwt_payload: { id: any }, done: (arg0: null, arg1: boolean) => any) => {
        User.findOne({ _id: jwt_payload.id }, (err: any, user: any) => {
          if (err) {
            return done(err, false)
          }

          if (!user) {
            return done(null, false)
          }

          return done(null, user)
        })
      }
    )
  )
}
