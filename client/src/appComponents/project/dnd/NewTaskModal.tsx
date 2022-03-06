import React from "react"
import { AddIcon, CloseIcon, StarIcon } from "@chakra-ui/icons"
import {
  Box,
  Text,
  Container,
  Button,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  FormControl,
  FormLabel,
  Input,
  Select,
  Flex,
} from "@chakra-ui/react"
import { BACKEND_URI } from "lib/config"
import { useParams } from "react-router-dom"

const initialFormValues = {
  title: "",
  description: "",
  priority: "Normal",
}

const columns = ["Todo", "In progress", "Done"]

const NewTask = () => {
  const [formValues, setFormValues] = React.useState(initialFormValues)
  const [column, setColumn] = React.useState(columns[0])
  const [error, setError] = React.useState<unknown>()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [loading, setLoading] = React.useState(false)
  // const { user } = useAuth()
  const { id } = useParams()

  console.log(formValues, column)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value || event.target.checked,
    })

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)
    if (!formValues.title || !formValues.priority) return
  }

  return (
    <>
      <Box p={0}>
        <Container
          display="flex"
          alignItems="center"
          px={4}
          py={2}
          borderRadius="md"
          _hover={{ bg: "gray.400", cursor: "pointer" }}
          onClick={onOpen}
        >
          <AddIcon />
          <Text ml={6}>New task</Text>
        </Container>
      </Box>

      {/* Modal */}

      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        size="xl"
        onClose={onClose}
      >
        <ModalOverlay className="filterblur4" />
        <ModalContent as="form" onSubmit={handleSubmit}>
          <ModalHeader>Add a new task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Task's name</FormLabel>
              <Input
                variant={"filled"}
                type="text"
                name="title"
                autoComplete="off"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>
                Task's description{" "}
                <Text display={"inline"} fontSize="x-small">
                  (optional)
                </Text>
              </FormLabel>
              <Input
                variant={"filled"}
                type="text"
                name="description"
                autoComplete="off"
                onChange={handleChange}
              />
            </FormControl>
            <Flex
              gap={{ base: "0", md: "20px" }}
              direction={{ base: "column", md: "row" }}
            >
              <FormControl mt={4}>
                <FormLabel>Priority</FormLabel>

                <Select
                  icon={<StarIcon />}
                  iconSize={"sm"}
                  variant={"filled"}
                  name="priority"
                  value={formValues.priority}
                  onChange={handleSelect}
                >
                  <option value="Low">Low</option>
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </Select>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Column</FormLabel>

                <Select
                  icon={<StarIcon />}
                  iconSize={"sm"}
                  variant={"filled"}
                  name="priority"
                  value={column}
                  onChange={(e) => setColumn(e.target.value)}
                >
                  {columns.map((item) => (
                    <option value={item}>{item}</option>
                  ))}
                </Select>
              </FormControl>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="solid" colorScheme={"green"} type="submit">
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
export default NewTask
