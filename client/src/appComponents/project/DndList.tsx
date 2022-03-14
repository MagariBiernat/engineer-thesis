import { Flex } from "@chakra-ui/react"
import { columnInterface } from "lib/types/project"
import React from "react"
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd"
import { useParams } from "react-router-dom"
import {
  useMoveTaskMutation,
  useReorderColumnMutation,
} from "redux/services/currentProject"
import List from "./dnd/List"

interface Props {
  columnsState: columnInterface[]
}

const DndList = ({ columnsState }: Props) => {
  const { id = "" } = useParams()
  const [columns, setColumns] = React.useState(columnsState)
  const [moveTask] = useMoveTaskMutation()
  const [reorderColumn] = useReorderColumnMutation()

  React.useEffect(() => {
    columnsState && setColumns(columnsState)
  }, [columnsState])

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const { source, destination, draggableId, type } = result

    if (type === "column") {
      const columnToMove = columns.find((i) => i._id === draggableId)!

      let colsReordered = [...columns]
      colsReordered.splice(source.index, 1)
      colsReordered.splice(destination.index, 0, columnToMove)

      const move = async () =>
        reorderColumn({
          destinationIndex: destination.index,
          columnId: draggableId,
          sourceIndex: source.index,
          projectId: id,
        })

      move()
      setColumns(colsReordered)
    }

    //task reorder
    if (type === "task") {
      if (destination.droppableId === source.droppableId) {
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

        setColumns(updatedColumns)
        const move = async () =>
          moveTask({
            destinationIndex: destination.index,
            sourceColumnId: source.droppableId,
            sourceIndex: source.index,
            taskId: result.draggableId,
            projectId: id,
          })

        move()
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

        setColumns(updatedColumns)

        const move = async () =>
          moveTask({
            destinationIndex: destination.index,
            sourceColumnId: source.droppableId,
            destinationColumnId: destination.droppableId,
            sourceIndex: source.index,
            taskId: result.draggableId,
            projectId: id,
          })
        move()
      }
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided, snapshot) => (
          <Flex
            {...provided.droppableProps}
            ref={provided.innerRef}
            mt={12}
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            {columns?.map((column, index) => (
              <List key={column._id} column={column} index={index} />
            ))}
            {!snapshot.isDraggingOver && <List newColumn />}
            {provided.placeholder}
          </Flex>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default DndList
