import { Container, OrderedList } from "@chakra-ui/react"
import { columnInterface } from "lib/types/project"
import React from "react"
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd"
import Column from "./dnd/Column"

interface Props {
  initial: columnInterface[]
  withScrollableColumns: boolean
}

const DndList = ({ initial, withScrollableColumns }: Props) => {
  console.log(initial)
  const onDragEnd = (result: DropResult) => {}
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId="board"
        type="COLUMN"
        direction="horizontal"
        isCombineEnabled={false}
      >
        {(provided) => (
          <Container
            display={"flex"}
            width="full"
            maxW="full"
            p={0}
            mt={6}
            justifyContent="flex-start"
            gap="30px"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {initial.map((item, index) => (
              <Column
                key={index}
                index={index}
                title={item.name}
                tasks={item.tasks}
              />
            ))}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default DndList
