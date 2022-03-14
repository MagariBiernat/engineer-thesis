import React from "react"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Checkbox,
  toast,
  useToast,
} from "@chakra-ui/react"
import { useCreateProjectMutation } from "redux/services/projects"

interface Props {
  isOpen: boolean
  onClose: VoidFunction
}

const initialValues = {
  name: "",
  description: "",
  isPersonal: false,
}

const NewProjectModal = ({ isOpen, onClose }: Props) => {
  const [formValues, setFormValues] = React.useState(initialValues)
  const [createProject] = useCreateProjectMutation()
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<unknown>()
  const [nameError, setNameError] = React.useState("")
  const toast = useToast()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value || event.target.checked,
    })

  const handleCreateProject = async () => createProject(formValues)

  const handleSubmit = React.useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault()
      setError(null)
      if (!formValues.name) return alert("Fields are empty")
      setIsLoading(true)
      try {
        handleCreateProject()
          .then(() => {
            toast({
              title: "Success 💪 ",
              duration: 4500,
              description: "Successfully created project",
              status: "success",
              position: "bottom-end",
              isClosable: true,
            })
            onClose()
          })
          .catch(() => {
            toast({
              title: "Error  ❗️❗️ ",
              duration: 4500,
              description: "An error occurred  👀",
              status: "warning",
              position: "bottom-end",
              isClosable: true,
            })
          })
      } finally {
        setIsLoading(false)
      }
    },
    [formValues]
  )

  const isSubmitDisabled = !formValues.name || isLoading
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay className="filterblur4" />
        <ModalContent as="form" onSubmit={handleSubmit}>
          <ModalHeader>Create a new project</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Project's name</FormLabel>
              <Input
                type="text"
                name="name"
                autoComplete="off"
                onChange={handleChange}
              />
              <FormErrorMessage>{nameError}</FormErrorMessage>
            </FormControl>

            <FormControl mt={6}>
              <FormLabel>Project's description (optional)</FormLabel>
              <Input
                type="text"
                name="description"
                autoComplete="off"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mt={6}>
              <Checkbox
                type="checkBox"
                name="isPersonal"
                onChange={handleChange}
              >
                Private project
              </Checkbox>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" disabled={isSubmitDisabled} type="submit">
              {isLoading ? "Loading...." : "Create"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default NewProjectModal
