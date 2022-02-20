import { Box, Heading } from "@chakra-ui/react"
import React from "react"
import { Draggable } from "react-beautiful-dnd"
import List from "./List"

interface Props {
  title: string
  index: number
  tasks: any
}

const Column = ({ title, index, tasks }: Props) => {
  return (
    <Draggable draggableId={title} index={index}>
      {(provided, snapshot) => (
        <Box
          display="flex"
          flexDirection="column"
          width="280px"
          padding="6px 20px"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <Heading fontSize="xl" ml={1} mb={6}>
            {title}
          </Heading>
          <List listId={title} tasks={tasks} title={title} />
        </Box>
      )}
    </Draggable>
  )
}

export default Column
