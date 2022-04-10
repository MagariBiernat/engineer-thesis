import { Flex, useColorModeValue, Text } from "@chakra-ui/react"
import { projectInterface } from "lib/types/project"
import { useNavigate } from "react-router-dom"
import { AiFillLock } from "react-icons/ai"
import { BsPeople } from "react-icons/bs"
import { BiTask } from "react-icons/bi"
interface ProjectProps {
  item: projectInterface
}

//TODO: add default background picture

const Project: React.FunctionComponent<ProjectProps> = ({ item }) => {
  const navigate = useNavigate()

  const tasksCount = item.columns
    ?.map((i) => i.tasks.length)
    .reduce((a, b) => a + b, 0)

  return (
    <Flex
      pos="relative"
      minH="100px"
      // maxW="240px"
      minW="200px"
      my={{ base: "16px", md: "0" }}
      maxW={{ base: "45%", md: "30%", lg: "24%", xl: "18%" }}
      flexBasis={{ base: "45%", md: "30%", lg: "24%", xl: "18%" }}
      direction="column"
      justifyContent="space-between"
      bg={useColorModeValue("rgba(250,250,250, .9)", "rgba(240,240,240,.04)")}
      rounded="lg"
      p={3}
      border="1px solid"
      borderColor={useColorModeValue(
        "rgba(26,30,34,.1)",
        "rgba(240,240,240,.64)"
      )}
      boxShadow={"lg"}
      transition="all .4s"
      _hover={{
        bg: useColorModeValue("gray.300", "rgba(240,240,240,.24)"),
        cursor: "pointer",
        boxShadow: "2xl",
      }}
      onClick={() => navigate(`/app/project/${item._id}`)}
    >
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Text fontSize="md" wordBreak={"break-word"}>
          {item.name}
        </Text>
        {item.isPersonal && <AiFillLock />}
      </Flex>
      <Text fontSize="x-small" pt={4} pb={6}></Text>

      <Flex alignItems="center" gap="12px">
        <Flex alignItems="center" gap="6px">
          <BsPeople />
          <Text fontSize="sm">{item.collaborators.length}</Text>
        </Flex>
        <Flex alignItems="center" gap="6px">
          <BiTask />
          <Text fontSize="sm">{tasksCount}</Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Project
