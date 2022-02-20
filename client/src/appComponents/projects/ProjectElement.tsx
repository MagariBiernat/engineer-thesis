import { Box, Flex, useColorModeValue, Text } from "@chakra-ui/react"
import { projectInterface } from "lib/types/project"
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

export default Project
