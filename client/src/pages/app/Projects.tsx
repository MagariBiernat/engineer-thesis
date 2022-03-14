import { Box, Button, Flex, Input, useDisclosure } from "@chakra-ui/react"
import NewProjectModal from "appComponents/projects/NewProjectModal"
import React from "react"
import ListOfProjects from "appComponents/projects/ListOfProjects"
import { useGetAllProjectsQuery } from "redux/services/projects"
import { useTypedSelector } from "redux/store"
import { reset } from "redux/slices/currentProject"

const TopBarProjects = ({ onOpen }: { onOpen: () => void }) => {
  return (
    <Flex
      justifyContent="space-between"
      align={{ base: "flex-start", md: "center" }}
      direction={{ base: "column", md: "row" }}
    >
      <Box w={{ base: "40%", md: "25%" }} mb={{ base: "20px", md: "0" }}>
        <Input type="search" placeholder="Search project..." />
      </Box>
      <Button
        w={{ base: "40%", md: "auto" }}
        bg="blueLight"
        px={8}
        _hover={{ bg: "blue.300" }}
        color="#fafafa"
        onClick={onOpen}
        boxShadow="2xl"
      >
        New project
      </Button>
    </Flex>
  )
}

const Projects = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { shouldRefetch } = useTypedSelector((state) => state.projects)
  const [error, setError] = React.useState<string>("")
  const { refetch, isError } = useGetAllProjectsQuery()

  React.useEffect(() => {
    refetch()
  }, [])

  React.useEffect(() => {
    setError(isError ? "Error occurred" : "")
  }, [isError])

  React.useEffect(() => {
    shouldRefetch && refetch()
  }, [shouldRefetch])

  return (
    <>
      <Box width="full" p={2}>
        <Box width="full" p={4}>
          <TopBarProjects onOpen={onOpen} />
        </Box>
        <ListOfProjects />
      </Box>
      <NewProjectModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default Projects
