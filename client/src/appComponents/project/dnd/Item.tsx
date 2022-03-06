import { Container, useColorModeValue } from "@chakra-ui/react"
import { taskInterface } from "lib/types/project"
import { useTaskDetailsModal } from "pages/app/Project/Project"
import React from "react"
import { Draggable } from "react-beautiful-dnd"

interface Props {
  item: taskInterface
  index: number
}
const Item: React.FC<Props> = ({ item, index }) => {
  const backgroundItem = useColorModeValue("#fff", "#000")
  const backgroundItemHover = useColorModeValue(
    "rgb(244,245,247)",
    "rgb(46,50,52)"
  )
  const borderOnHover = useColorModeValue(
    "rgba(46,50,52, .2)",
    "rgba(244,245,247, .2)"
  )

  const { onOpen } = useTaskDetailsModal()
  return (
    <Draggable draggableId={item._id.toString()} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          key={item._id}
          bg={backgroundItem}
          style={{
            ...provided.draggableProps.style,
          }}
          border="1px solid transparent"
          borderRadius="md"
          p={3}
          _hover={{
            boxSizing: "border-box",
            bg: backgroundItemHover,
            border: `1px solid ${borderOnHover}`,
          }}
          onClick={onOpen}
        >
          {item.title}
        </Container>
      )}
    </Draggable>
  )
}

export default Item
