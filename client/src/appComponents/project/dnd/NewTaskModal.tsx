import React from "react"
import { AddIcon, StarIcon } from "@chakra-ui/icons"
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
  useToast,
} from "@chakra-ui/react"
import { useParams } from "react-router-dom"
import { useCreateTaskMutation } from "redux/services/currentProject"
import { columnInterface } from "lib/types/project"

interface Props {
  columns: columnInterface[]
}

const initialFormValues = {
  title: "",
  description: "",
  priority: "Normal",
}

const NewTask: React.FC<Props> = ({ columns }) => {
  const { id = "" } = useParams()

  const [formValues, setFormValues] = React.useState(initialFormValues)
  const [column, setColumn] = React.useState<Partial<columnInterface>>()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [addTask, { isLoading }] = useCreateTaskMutation()
  const toast = useToast()

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

  const handleChangeColumn = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const column = columns?.find((i) => i._id === event.target.value)!
    setColumn(column)
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!formValues.title || !formValues.priority || !column) return alert("x")

    const handleAddTask = async () =>
      addTask({ ...formValues, columnId: column?._id!, projectId: id }).unwrap()

    handleAddTask()
      .then((success) => {
        setFormValues(initialFormValues)
        toast({
          title: "Success 💪 ",
          duration: 1300,
          description: "New task was added successfully",
          status: "success",
          position: "bottom-end",
          isClosable: true,
        })
        return onClose()
      })
      .catch((err) => console.log(err))
  }

  React.useEffect(() => {
    if (columns) setColumn(columns[0])
  }, [columns])

  return (
    <>
      <Box p={0}>
        <Container
          display="flex"
          alignItems="center"
          px={4}
          py={2}
          bg="blueLight"
          borderRadius="md"
          color="#fafafa"
          boxShadow="2xl"
          _hover={{ bg: "blue.300", cursor: "pointer" }}
          onClick={onOpen}
        >
          <AddIcon />
          <Text ml={6}>New task</Text>
        </Container>
      </Box>

      <Modal
        motionPreset="scale"
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
              <FormLabel>Task's title</FormLabel>
              <Input
                variant={"filled"}
                type="text"
                name="title"
                value={formValues.title}
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
                value={formValues.description}
                autoComplete="off"
                onChange={handleChange}
              />
            </FormControl>
            <Flex
              gap={{ base: "0", md: "20px" }}
              direction={{ base: "column", md: "row" }}
            >
              <FormControl mt={4}>
                <FormLabel>Board</FormLabel>

                <Select
                  icon={<StarIcon />}
                  iconSize={"sm"}
                  variant={"filled"}
                  name="priority"
                  value={column?._id}
                  onChange={handleChangeColumn}
                >
                  {columns?.map((item) => (
                    <option key={item?._id} value={item?._id}>
                      {item?.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
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
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              variant="solid"
              colorScheme={"green"}
              type="submit"
              disabled={isLoading}
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
export default NewTask
