import { Box, Button, Flex, useDisclosure } from "@chakra-ui/react"
import NewProjectModal from "appComponents/projects/NewProjectModal"
import React from "react"
import { BACKEND_URI } from "lib/config"
import useFetch from "lib/hooks/useFetch"
import ListOfProjects from "appComponents/projects/ListOfProjects"
import { allProjectsFetchInterface } from "lib/types/project"

const Projects = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  // const { response, error, loading } = useFetch(
  //   `${BACKEND_URI}/projects/all`,
  //   "GET",
  //   user!.token
  // )

  // if (loading) {
  //   return <div>loading</div>
  // }

  // if (error) {
  //   return <div>error</div>
  // }

  // if (response) {
  //   const { data } = response as allProjectsFetchInterface
  //   return (
  //     <>
  //       <Box width="full" p={2}>
  //         <Box width="full" p={4}>
  //           <Flex
  //             justifyItems="flex-end"
  //             align="center"
  //             direction="row-reverse"
  //           >
  //             <Button
  //               bg="blue.600"
  //               px={8}
  //               _hover={{ bg: "blue.500" }}
  //               onClick={onOpen}
  //             >
  //               New project
  //             </Button>
  //           </Flex>
  //         </Box>
  //         <ListOfProjects owner={data.owner} collaborator={data.collaborator} />
  //       </Box>
  //       <NewProjectModal isOpen={isOpen} onClose={onClose} />
  //     </>
  //   )
  // }

  return <></>
}

export default Projects
