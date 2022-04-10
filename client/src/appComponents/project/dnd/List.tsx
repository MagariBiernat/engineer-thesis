import { PlusSquareIcon } from "@chakra-ui/icons"
import {
  Box,
  Button,
  Heading,
  Input,
  useColorModeValue,
  useOutsideClick,
  useToast,
} from "@chakra-ui/react"
import { AnimatePresence } from "framer-motion"
import { columnInterface } from "lib/types/project"
import React from "react"
import { FiMinus, FiPlus } from "react-icons/fi"
import { useParams } from "react-router-dom"
import {
  useCreateNewColumnInProjectMutation,
  useGetProjectQuery,
} from "redux/services/projects"
import styled from "styled-components"
import Column from "./Column"

interface Props {
  column?: columnInterface
  index?: number
  newColumn?: boolean
}

const List: React.FC<Props> = ({ column, index, newColumn }) => {
  if (newColumn) return <NewColumn />
  return <Column column={column!} index={index!} />
}

const NewColumn = () => {
  const { id = "" } = useParams()
  const [isExpanded, setIsExpanded] = React.useState(false)
  const [newColumnName, setNewColumnName] = React.useState("")
  const [newColumn] = useCreateNewColumnInProjectMutation()
  const containerBackground = useColorModeValue(
    "rgb(241,243,245)",
    "rgba(37,41,48)"
  )
  const headingColor = useColorModeValue(
    "rgb(128,136,154)",
    "rgba(242,245,248, .6)"
  )
  const toast = useToast()
  const ref = React.useRef(null)
  useOutsideClick({
    ref,
    handler: () => setIsExpanded(false),
  })

  const addColumn = async () =>
    newColumn({ columnName: newColumnName, projectId: id })

  const handleSubmitForm = (event: React.FormEvent) => {
    event.preventDefault()

    if (!newColumnName) return alert("Column name not specified")

    addColumn()
      .then((success) => {
        toast({
          title: "Success 💪 ",
          duration: 9000,
          description: "New column was added successfully",
          status: "success",
          position: "bottom-end",
          isClosable: true,
        })
        setNewColumnName("")
      })
      .catch((err) => console.log(err))
  }

  const toggleExpanded = () => setIsExpanded(!isExpanded)
  return (
    <Box
      borderRadius="sm"
      bg={containerBackground}
      mr={6}
      cursor="pointer"
      ref={ref}
    >
      <AnimatePresence exitBeforeEnter>
        {isExpanded ? (
          <Box
            as="form"
            onSubmit={handleSubmitForm}
            borderRadius="sm"
            w="280px"
            bg={containerBackground}
            p={2}
          >
            <Input
              placeholder="New column..."
              fontSize="md"
              value={newColumnName}
              onChange={(e) => setNewColumnName(e?.target.value)}
            />
          </Box>
        ) : (
          <Box
            borderRadius="sm"
            bg={containerBackground}
            onClick={toggleExpanded}
            p={2}
          >
            <FiPlus size={22} color={headingColor} />
          </Box>
        )}
      </AnimatePresence>
    </Box>
  )
}

export default React.memo(List)
