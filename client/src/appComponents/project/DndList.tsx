import { Flex } from "@chakra-ui/react"
import { columnInterface } from "lib/types/project"
import React from "react"
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd"
import List from "./dnd/List"

interface Props {
  columns: columnInterface[]
  setColumns: React.Dispatch<React.SetStateAction<columnInterface[]>>
}

const DndList = ({ columns, setColumns }: Props) => {
  // console.log(columns)

  console.log(columns)

  const onDragEnd = (result: DropResult) => {
    console.log(result)

    if (!result.destination) return

    const { source, destination, draggableId, type } = result

    //columnReorder

    if (type === "column") {
      const columnToMove = columns.find((i) => i._id === draggableId)!

      let colsReordered = [...columns]
      colsReordered.splice(source.index, 1)
      colsReordered.splice(destination.index, 0, columnToMove)

      setColumns(colsReordered)
    }

    //task reorder
    if (type === "task") {
      if (destination.droppableId === source.droppableId) {
        // same column
        const sourceColumn = columns.find((i) => i._id === source.droppableId)!

        const copiedItems = [...sourceColumn.tasks]
        const [removed] = copiedItems.splice(source.index, 1)

        copiedItems.splice(destination.index, 0, removed)

        const updatedColumns = columns.map((i) => {
          if (i._id === source.droppableId) {
            return { ...i, tasks: copiedItems }
          }
          return i
        })

        // TODO: update redux state

        setColumns(updatedColumns)
      } else {
        const sourceColumn = columns.find((i) => i._id === source.droppableId)!
        const destinationColumn = columns.find(
          (i) => i._id === destination.droppableId
        )!
        const sourceItems = [...sourceColumn.tasks]
        const destinationItems = [...destinationColumn.tasks]
        const [removed] = sourceItems.splice(source.index, 1)

        destinationItems.splice(destination.index, 0, removed)

        const updatedColumns = columns.map((i) => {
          if (i._id === source.droppableId) {
            return { ...i, tasks: sourceItems }
          }

          if (i._id === destination.droppableId) {
            return { ...i, tasks: destinationItems }
          }
          return i
        })

        // TODO: update redux state

        setColumns(updatedColumns)
      }
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <Flex
            {...provided.droppableProps}
            ref={provided.innerRef}
            gap="12px"
            mt={12}
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            {columns?.map((column, index) => (
              <List key={column._id} column={column} index={index} />
            ))}
            {provided.placeholder}
          </Flex>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default DndList
