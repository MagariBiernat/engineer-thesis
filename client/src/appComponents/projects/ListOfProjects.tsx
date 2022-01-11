import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import { allProjectsFetchInterface, projectInterface } from "lib/types/project"
import React from "react"
import { useNavigate } from "react-router-dom"

interface ProjectProps {
  item: projectInterface
}

//TODO: add default background picure

const Project: React.FunctionComponent<ProjectProps> = ({ item }) => {
  const navigate = useNavigate()

  return (
    <Box
      minH="160px"
      minW="240px"
      bg={useColorModeValue("white", "gray.800")}
      rounded="lg"
      mr="6"
      p={3}
      boxShadow={"dark-lg"}
      transition="all .4s"
      _hover={{
        bg: useColorModeValue("gray.100", "gray.900"),
        cursor: "pointer",
      }}
      onClick={() => navigate(`/app/project/${item._id}`)}
    >
      <Flex direction="column">
        <Text>{item.name}</Text>
        {item.description && <Text>{item.description}</Text>}
        {/* number of collaborators */}
        {/* owner name */}
      </Flex>
    </Box>
  )
}

interface ListOfProjectsProps {
  data?: allProjectsFetchInterface
}

const ListOfProjects: React.FunctionComponent<ListOfProjectsProps> = ({
  data,
}) => {
  return (
    <>
      {data && (
        <Box p={4}>
          <Text pl={4}>Your projects</Text>
          <Flex
            align="center"
            flexWrap="wrap"
            justifyItems="flex-start"
            direction={{ base: "row" }}
            p={4}
          >
            {data.owner.length > 0 ? (
              data.owner.map((item, index) => (
                <Project item={item} key={index} />
              ))
            ) : (
              <NoProjects text="You don't own any projects" />
            )}
          </Flex>
          <Text pl={4} pt={10}>
            Projects You take part in
          </Text>
          <Flex
            align="center"
            flexWrap="wrap"
            justifyItems="flex-start"
            direction={{ base: "row" }}
            p={4}
          >
            {data.collaborator.length > 0 ? (
              data.collaborator.map((item, index) => (
                <Project item={item} key={index} />
              ))
            ) : (
              <NoProjects text="You are not in any project, yet !" />
            )}
          </Flex>
        </Box>
      )}
    </>
  )
}

interface NoProjectsProps {
  text: string
}

const NoProjects: React.FunctionComponent<NoProjectsProps> = ({ text }) => (
  <Box height="full" width="full" pt={6}>
    <Text fontStyle="italic" textAlign="left">
      {text}
    </Text>
  </Box>
)

export default ListOfProjects
