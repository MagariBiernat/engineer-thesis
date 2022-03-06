import { columnInterface } from "lib/types/project"
import React from "react"
import { Draggable, Droppable } from "react-beautiful-dnd"
import { Heading, Stack, useColorModeValue } from "@chakra-ui/react"
import styled from "styled-components"
import Item from "./Item"

interface Props {
  column: columnInterface
  index: number
}

const Column: React.FC<Props> = ({ column, index }) => {
  const containerBackground = useColorModeValue("rgb(235,236,240", "gray.700")
  console.log(containerBackground)
  return (
    <Draggable draggableId={column._id.toString()} index={index}>
      {(provided, snapshot) => (
        <Stack
          {...provided.draggableProps}
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}
          bg={containerBackground}
          direction="column"
          w="280px"
          h="auto"
          borderRadius="md"
        >
          <Heading p={6} py={4} size={"sm"} {...provided.dragHandleProps}>
            {column.name}
          </Heading>
          <Droppable droppableId={column._id} type="task">
            {(provided, snapshot) => (
              <Stack
                ref={provided.innerRef}
                {...provided.droppableProps}
                isDraggingOver={snapshot.isDraggingOver}
                direction="column"
                p={6}
                pt={2}
                minH="40px"
              >
                {column.tasks.map((item, index) => (
                  <Item key={item._id} item={item} index={index} />
                ))}
                {provided.placeholder}
              </Stack>
            )}
          </Droppable>
        </Stack>
      )}
    </Draggable>
  )
}

export default Column

const Container = styled.div<{ backgroundColor: string; isDragging: boolean }>`
  min-width: 180px;
  max-width: 260px;
  min-height: 180px;
  border: 1px solid white;
  background: ${({ backgroundColor }) => backgroundColor};
  border-color: ${({ isDragging }) => isDragging && "red"};
`

const Title = styled.h3`
  padding: 12px;
  border-bottom: 1px solid #2a6be4;
  margin-bottom: 6px;
`

const InnerList = styled.div<{ isDraggingOver: boolean }>`
  min-height: 30px;
  padding: 6px 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: ${({ isDraggingOver }) =>
    isDraggingOver ? "red" : "transparent"};
`
