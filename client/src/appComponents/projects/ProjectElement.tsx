import { Box, Flex, useColorModeValue, Text } from "@chakra-ui/react"
import { projectInterface } from "lib/types/project"
import { useNavigate } from "react-router-dom"

interface ProjectProps {
  item: projectInterface
}

//TODO: add default background picture

const Project: React.FunctionComponent<ProjectProps> = ({ item }) => {
  const navigate = useNavigate()

  return (
    <Box
      minH="120px"
      minW="200px"
      bg={useColorModeValue("white", "gray.800")}
      rounded="md"
      mr="6"
      p={3}
      boxShadow={"md"}
      transition="all .4s"
      _hover={{
        bg: useColorModeValue("gray.300", "gray.900"),
        cursor: "pointer",
        boxShadow: "2xl",
      }}
      onClick={() => navigate(`/app/project/${item._id}`)}
    >
      <Flex direction="column">
        <Text fontSize="md">{item.name}</Text>
        {item.description && <Text>{item.description}</Text>}
        {/* number of collaborators */}
        {/* owner name */}
      </Flex>
    </Box>
  )
}

export default Project
