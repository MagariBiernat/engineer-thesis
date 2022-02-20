import { Box, Flex, Text } from "@chakra-ui/react"
import { projectInterface } from "lib/types/project"
import React from "react"
import Project from "./ProjectElement"

interface ListOfProjectsProps {
  owner: projectInterface[]
  collaborator: projectInterface[]
}

const ListOfProjects: React.FunctionComponent<ListOfProjectsProps> = ({
  owner,
  collaborator,
}) => {
  console.log(owner)
  return (
    <>
      {owner && collaborator && (
        <Box p={4}>
          <Text pl={4}>Your projects</Text>
          <Flex
            align="center"
            flexWrap="wrap"
            justifyItems="flex-start"
            direction={{ base: "row" }}
            p={4}
          >
            {owner.length > 0 ? (
              owner.map((item, index) => <Project item={item} key={index} />)
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
            {collaborator.length > 0 ? (
              collaborator.map((item, index) => (
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
