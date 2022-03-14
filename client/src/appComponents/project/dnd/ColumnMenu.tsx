import {
  MenuList,
  MenuItem,
  useColorModeValue,
  AlertDialogOverlay,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  Button,
  Input,
  useToast,
} from "@chakra-ui/react"
import React from "react"
import { useParams } from "react-router-dom"
import {
  useDeleteColumnMutation,
  useUpdateColumnNameMutation,
} from "redux/services/projects"

interface Props {
  columnId: string
}

const ColumnMenu: React.FC<Props> = ({ columnId }) => {
  const { id = "" } = useParams()
  const toast = useToast()
  //edit Column
  const [isOpenEdit, setIsOpenEdit] = React.useState(false)
  const onCloseEdit = () => setIsOpenEdit(false)
  const cancelRefEdit = React.useRef(null)
  // delete column
  const [isOpenDelete, setIsOpenDelete] = React.useState(false)
  const onClose = () => setIsOpenDelete(false)
  const cancelRef = React.useRef(null)
  const containerBackground = useColorModeValue(
    "rgb(251,252,253)",
    "rgba(37,41,48)"
  )
  const [columnNewName, setColumnNewName] = React.useState("")
  //service handlers
  const [updateColumn] = useUpdateColumnNameMutation()
  const [deleteColumn] = useDeleteColumnMutation()

  const editColumn = async () =>
    updateColumn({
      columnId: columnId,
      columnName: columnNewName,
      projectId: id,
    })
  const delColumn = async () =>
    deleteColumn({ projectId: id, columnId: columnId })

  const handleEditColumn = (event: React.FormEvent) => {
    event.preventDefault()
    if (!columnNewName) return alert("New name is required")

    editColumn()
      .then(() => {
        toast({
          title: "Success 💪 ",
          duration: 4500,
          description: "Successfully edited column name",
          status: "info",
          position: "bottom-end",
          isClosable: true,
        })
      })
      .catch(onError)

    return onCloseEdit()
  }

  const handleDeleteColumn = (event: React.FormEvent) => {
    event.preventDefault()
    delColumn()
      .then(() =>
        toast({
          title: "Success 💪 ",
          duration: 4500,
          description: "Successfully deleted column",
          status: "info",
          position: "bottom-end",
          isClosable: true,
        })
      )
      .catch(onError)
    return onClose()
  }

  const onError = () =>
    toast({
      title: "Wrong 👀",
      duration: 3500,
      description: "Something went wrong ❗️❗️",
      status: "error",
      position: "bottom-end",
      isClosable: true,
    })

  return (
    <>
      <MenuList background={containerBackground}>
        <MenuItem onClick={() => setIsOpenEdit(true)}>Edit column</MenuItem>
        <MenuItem onClick={() => setIsOpenDelete(true)}>Delete</MenuItem>
      </MenuList>

      <AlertDialog
        isOpen={isOpenEdit}
        leastDestructiveRef={cancelRefEdit}
        onClose={onCloseEdit}
      >
        <AlertDialogOverlay>
          <AlertDialogContent as="form" onSubmit={handleEditColumn}>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Edit column name
            </AlertDialogHeader>

            <AlertDialogBody>
              <Input
                type="text"
                placeholder="New name..."
                onChange={(e) => setColumnNewName(e.target.value)}
              />
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRefEdit} onClick={onCloseEdit}>
                Cancel
              </Button>
              <Button colorScheme="red" type="submit" ml={3}>
                Edit
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <AlertDialog
        isOpen={isOpenDelete}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent as="form" onSubmit={handleDeleteColumn}>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete column
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" colorScheme="red" ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default ColumnMenu
