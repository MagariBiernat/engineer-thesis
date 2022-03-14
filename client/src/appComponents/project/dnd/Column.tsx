import { columnInterface } from "lib/types/project"
import React from "react"
import { Draggable, Droppable } from "react-beautiful-dnd"
import {
  Box,
  Heading,
  Menu,
  MenuButton,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import { BiMenuAltRight } from "react-icons/bi"
import styled, { AnyStyledComponent } from "styled-components"
import Item from "./Item"
import ColumnMenu from "./ColumnMenu"
import { StyledComponent } from "@emotion/styled"

interface Props {
  column: columnInterface
  index: number
}

const Column: React.FC<Props> = ({ column, index }) => {
  const containerBackground = useColorModeValue(
    "rgb(241,243,245)",
    "rgba(37,41,48)"
  )
  const headingColor = useColorModeValue(
    "rgb(128,136,154)",
    "rgba(242,245,248, .6)"
  )
  const isDraggingOverBackgroundColor = useColorModeValue(
    "lightBlue",
    "rgba(240,240,240, .2)"
  )

  return (
    <Draggable draggableId={column._id.toString()} index={index}>
      {(provided, snapshot) => (
        <MainStack
          {...provided.draggableProps}
          ref={provided.innerRef}
          bg={containerBackground}
          direction="column"
          minW="280px"
          w="280px"
          h="auto"
          borderRadius="sm"
          mr={8}
        >
          <Heading
            position="relative"
            p={2}
            py={2}
            pb={0}
            size={"sm"}
            color={headingColor}
            {...provided.dragHandleProps}
            display="flex"
            justifyContent={"space-between"}
          >
            {column.name}
            <Menu>
              <MenuButton>
                <MenuIcon size={22} />
              </MenuButton>
              <ColumnMenu columnId={column._id} />
            </Menu>
          </Heading>
          <Droppable droppableId={column._id} type="task">
            {(provided, snapshot) => (
              <StyledStack
                ref={provided.innerRef}
                {...provided.droppableProps}
                $isDraggingOver={snapshot.isDraggingOver}
                $isDraggingOverBackgroundColor={isDraggingOverBackgroundColor}
                direction="column"
                p={2}
                pt={2}
                minH="40px"
              >
                {column.tasks.map((item, index) => (
                  <Item key={item._id} item={item} index={index} />
                ))}
                {column.tasks.length === 0 && (
                  <Text w="100%" textAlign={"center"} fontSize="lg" p={4}>
                    ¯\_(ツ)_/¯
                  </Text>
                )}
                {provided.placeholder}
              </StyledStack>
            )}
          </Droppable>
        </MainStack>
      )}
    </Draggable>
  )
}

export default Column

const StyledStack = styled(Stack)<{
  $isDraggingOver: boolean
  $isDraggingOverBackgroundColor: string
}>`
  transition: background 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);
  background: ${({ $isDraggingOver, $isDraggingOverBackgroundColor }) =>
    $isDraggingOver && $isDraggingOverBackgroundColor};
`

const MenuIcon = styled(BiMenuAltRight)`
  opacity: 0.2;
  transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);

  &:hover {
    color: #fff;
  }
`

const MainStack = styled(Stack)`
  &:hover ${MenuIcon} {
    opacity: 1;
  }
`
