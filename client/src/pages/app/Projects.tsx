import { Box, Button, Flex, useDisclosure } from "@chakra-ui/react"
import NewProjectModal from "appComponents/projects/NewProjectModal"
import React from "react"
import { BACKEND_URI } from "lib/config"
import useFetch from "lib/hooks/useFetch"
import ListOfProjects from "appComponents/projects/ListOfProjects"
import { allProjectsFetchInterface } from "lib/types/project"
import {
  useCreateProjectMutation,
  useGetAllProjectsQuery,
} from "redux/services/projects"
import { useTypedSelector } from "redux/store"

const Projects = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [error, setError] = React.useState<string>("")
  const { refetch, isError } = useGetAllProjectsQuery()

  React.useEffect(() => {
    setError(isError ? "Error occurred" : "")
  }, [isError])

  return (
    <>
      <Box width="full" p={2}>
        <Box width="full" p={4}>
          <Flex justifyItems="flex-end" align="center" direction="row-reverse">
            <Button
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
        </Box>
        <ListOfProjects />
      </Box>
      <NewProjectModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default Projects
