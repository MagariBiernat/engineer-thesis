import { Box, Divider, Flex, Text, useColorModeValue } from "@chakra-ui/react"
import { projectInterface } from "lib/types/project"
import React from "react"
import { useTypedSelector } from "redux/store"
import Project from "./ProjectElement"
import { AiOutlineProject } from "react-icons/ai"

const ListOfProjects: React.FunctionComponent = () => {
  const { ownerProjects, collaboratorsProjects } = useTypedSelector(
    (state) => state.projects
  )

  const headingColor = useColorModeValue(
    "rgb(128,136,154)",
    "rgba(242,245,248, .6)"
  )

  return (
    <>
      <Divider py={2} />
      <Box p={4} color={headingColor}>
        <Flex
          direction="row"
          alignItems="center"
          color={headingColor}
          pb={4}
          pl={2}
        >
          <AiOutlineProject color="#007bb2" size={22} />
          <Text ml={2} fontSize="lg">
            Your projects
          </Text>
        </Flex>
        <Flex
          align="center"
          flexWrap="wrap"
          gap={{ base: "4%", md: "25px" }}
          justifyItems={{ base: "space-between", md: "flex-start" }}
          direction={{ base: "row" }}
        >
          {ownerProjects.length > 0 ? (
            ownerProjects.map((item, index) => (
              <Project item={item} key={index} />
            ))
          ) : (
            <NoProjects text="You don't own any projects" />
          )}
        </Flex>

        <Divider my={4} mt={8} />
        <Flex
          direction="row"
          alignItems="center"
          color={headingColor}
          pl={2}
          pb={4}
        >
          <AiOutlineProject color="#007bb2" size={22} />
          <Text ml={2} fontSize="lg">
            Projects You take part in
          </Text>
        </Flex>
        <Flex
          align="center"
          flexWrap="wrap"
          gap="35px"
          justifyItems="flex-start"
          direction={{ base: "row" }}
        >
          {collaboratorsProjects.length > 0 ? (
            collaboratorsProjects.map((item, index) => (
              <Project item={item} key={index} />
            ))
          ) : (
            <NoProjects text="You are not in any project, yet !" />
          )}
        </Flex>
      </Box>
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
