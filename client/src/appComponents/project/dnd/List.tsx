import { Box, Text } from "@chakra-ui/react"
import { taskInterface } from "lib/types/project"
import React from "react"
import { Draggable, Droppable, DroppableProvided } from "react-beautiful-dnd"
import styled from "styled-components"

interface InnerTasksListProps {
  tasks: taskInterface[]
}

const InnerTasksList = React.memo<InnerTasksListProps>(({ tasks }) => (
  <>
    {tasks.map((task, index) => (
      <Draggable key={task._id} draggableId={task._id} index={index}>
        {(dragProvided, dragSnapshot) => <p>{task._id}</p>}
      </Draggable>
    ))}
  </>
))

interface InnerListProps {
  dropProvided: DroppableProvided
  tasks: taskInterface[]
  title?: string
}

const InnerList: React.FC<InnerListProps> = ({ tasks, dropProvided }) => (
  <>
    <Box ref={dropProvided.innerRef}>
      <InnerTasksList tasks={tasks} />
      {dropProvided.placeholder}
    </Box>
  </>
)

interface ListProps {
  tasks: taskInterface[]
  listId: string
  listType?: string
  title: string
}

const List: React.FunctionComponent<ListProps> = ({
  listId,
  tasks,
  title,
  listType = "LIST",
}) => (
  <Droppable droppableId={listId} type={listType}>
    {(dropProvided, dropSnapshot) => (
      <Wrapper
        isDraggingOver={dropSnapshot.isDraggingOver}
        isDraggingFrom={Boolean(dropSnapshot.draggingFromThisWith)}
        {...dropProvided.droppableProps}
      >
        <>
          {tasks.length > 0 ? (
            <InnerList
              tasks={tasks}
              title={title}
              dropProvided={dropProvided}
            />
          ) : (
            <Text> Empty 👀</Text>
          )}
        </>
      </Wrapper>
    )}
  </Droppable>
)

const Wrapper = styled.div<{
  isDraggingOver?: boolean
  isDraggingFrom?: boolean
}>``

export default List
