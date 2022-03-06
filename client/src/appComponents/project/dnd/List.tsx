import { columnInterface } from "lib/types/project"
import React from "react"
import styled from "styled-components"
import Column from "./Column"

interface Props {
  column: columnInterface
  index: number
}

const List: React.FC<Props> = ({ column, index }) => {
  return <Column column={column} index={index} />
}

export default React.memo(List)
