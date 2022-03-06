import { Box, Flex, Text } from "@chakra-ui/react"
import { projectInterface } from "lib/types/project"
import React from "react"
import { useTypedSelector } from "redux/store"
import Project from "./ProjectElement"

const ListOfProjects: React.FunctionComponent = () => {
  const { ownerProjects, collaboratorsProjects } = useTypedSelector(
    (state) => state.projects
  )

  return (
    <>
      <Box p={4}>
        <Text pl={4}>Your projects</Text>
        <Flex
          align="center"
          flexWrap="wrap"
          gap="20px"
          justifyItems="flex-start"
          direction={{ base: "row" }}
          p={4}
        >
          {ownerProjects.length > 0 ? (
            ownerProjects.map((item, index) => (
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
          gap="20px"
          justifyItems="flex-start"
          direction={{ base: "row" }}
          p={4}
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
