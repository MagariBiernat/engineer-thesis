import { Container, Flex, Text, useColorModeValue } from "@chakra-ui/react"
import { taskInterface } from "lib/types/project"
import { useTaskDetailsModal } from "pages/app/Project/Project"
import React from "react"
import { Draggable } from "react-beautiful-dnd"
import styled from "styled-components"
const Priority = [
  { name: "Urgent", color: "red" },
  { name: "High", color: "yellow" },
  { name: "Normal", color: "green" },
  { name: "Low", color: "blue" },
]

interface Props {
  item: taskInterface
  index: number
}
const Item: React.FC<Props> = ({ item, index }) => {
  const backgroundItem = useColorModeValue("#fff", "rgba(45,48,52)")
  const backgroundItemHover = useColorModeValue(
    "rgb(244,245,247)",
    "rgb(46,50,52)"
  )
  const borderOnHover = useColorModeValue(
    "rgba(46,50,52, .08)",
    "rgba(244,245,247, .08)"
  )

  const priorityColor =
    Priority.find((i) => i.name === item.priority)?.color! || "green"

  const { onOpen } = useTaskDetailsModal()

  const handleOpenModal = () => onOpen(item._id)
  return (
    <Draggable draggableId={item._id} index={index}>
      {(provided, snapshot) => (
        <StyledContainer
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          $isDragging={snapshot.isDragging}
          key={item._id}
          bg={backgroundItem}
          style={{
            ...provided.draggableProps.style,
          }}
          border="1px solid transparent"
          borderRadius="4px"
          boxShadow="lg"
          p={3}
          _hover={{
            boxSizing: "border-box",
            bg: backgroundItemHover,
            border: `1px solid ${borderOnHover}`,
          }}
          onClick={handleOpenModal}
        >
          <Text fontSize="md">{item.title}</Text>
          <Flex align="center" mt="6">
            <PriorityCircle color={priorityColor} />
            <CommentsCounts>{item.comments.length}</CommentsCounts>
          </Flex>
        </StyledContainer>
      )}
    </Draggable>
  )
}

export default Item

const StyledContainer = styled(Container)<{ $isDragging: boolean }>`
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  /* transform-origin; */
  border-color: ${({ $isDragging }) => $isDragging && "rgba(20,20,20, .2)"};
`

const PriorityCircle = styled.div<{ color: string }>`
  width: 12px;
  height: 12px;
  background: ${({ color }) => color};
  border-radius: 2px;
  opacity: 0.6;
  margin-right: 4px;
`

const CommentsCounts = styled.p`
  text-align: center;
  opacity: 0.6;
  font-size: 0.8rem;
  padding: 1px 6px;
`
