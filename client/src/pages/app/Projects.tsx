import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  useDisclosure,
} from "@chakra-ui/react"
import NewProjectModal from "appComponents/projects/NewProjectModal"
import React from "react"
import { BACKEND_URI } from "lib/config"
import useFetch from "lib/hooks/useFetch"
import { AuthContext } from "context/AuthContext"

const Projects = () => {
  const { user } = React.useContext(AuthContext)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { response, error, loading } = useFetch(
    `${BACKEND_URI}/projects/all`,
    "GET",
    user!.token
  )

  if (loading) {
    return <div>loading</div>
  }

  if (error) {
    return <div>error</div>
  }

  if (response) {
    console.log(response)
    return (
      <>
        <Box width="full" p={2}>
          <Box width="full" p={1}>
            <Flex
              justifyItems="flex-end"
              align="center"
              direction="row-reverse"
            >
              <Button
                bg="blue.600"
                px={8}
                _hover={{ bg: "blue.500" }}
                onClick={onOpen}
              >
                New project
              </Button>
            </Flex>
          </Box>
          <Box>
            {/* {projects.length > 0 ? (
              projects.map((item, index) => <div>hey</div>)
            ) : (
              <Container>No projects</Container>
            )} */}
          </Box>
        </Box>
        <NewProjectModal isOpen={isOpen} onClose={onClose} />
      </>
    )
  }

  return <></>
}

export default Projects
