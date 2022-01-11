import React from "react"
import { useLocation } from "react-router-dom"

interface Props {
  id?: string
}

const Project: React.FunctionComponent<Props> = () => {
  const location = useLocation()

  console.log(location)
  return <div> this is project</div>
}

export default Project
