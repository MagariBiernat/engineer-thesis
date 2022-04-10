import { Stack, Heading, Text, Button, Flex, Image } from "@chakra-ui/react"
import React from "react"
import img from "./../../undraw.svg"

const index = () => {
  return (
    <Stack
      textAlign={"center"}
      align={"center"}
      spacing={{ base: 8, md: 10 }}
      pt={{ base: 14, md: 22 }}
    >
      <Heading
        fontWeight={600}
        fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
        lineHeight={"110%"}
      >
        Project management{" "}
        <Text as={"span"} color={"orange.400"}>
          made easy
        </Text>
      </Heading>
      <Text color={"gray.500"} maxW={"3xl"}>
        Never miss a deadline. Never be late for one too. Keep track of your
        meetings and receive smart reminders in appropriate times. Read your
        smart “Daily Agenda” every morning.
      </Text>
      <Stack spacing={6} direction={"row"}>
        <Button rounded={"full"} px={6}>
          Learn more
        </Button>
      </Stack>
      <Flex p="0" alignItems="center" justifyContent={"center"}>
        <Image src={img} alt="undraw" maxH="300px" />
      </Flex>
    </Stack>
  )
}

export default index
