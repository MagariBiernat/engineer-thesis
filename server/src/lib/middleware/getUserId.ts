import { NextFunction, Request, Response } from "express"
import decodeToken from "../decodeToken"
export default function getUserIdMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id, email } = decodeToken(req.get("authorization")!.split(" ")[1])
  res.locals.id = id
  res.locals.email = email

  next()
}
