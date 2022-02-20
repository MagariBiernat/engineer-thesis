import {
  Flex,
  Box,
  Stack,
  Container,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react"
import Navigation from "components/Navigation"
import SignUpForm from "components/Signup/SignUpForm"

const Signup = () => {
  return (
    <Container maxW="full">
      <Navigation />
      <Flex minH={"80vh"} align={"center"} justify={"center"}>
        <Stack spacing={8} mx={"auto"} maxW={"2xl"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign up ✌️</Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.900")}
            boxShadow={"dark-lg"}
            p={8}
          >
            <SignUpForm />
          </Box>
        </Stack>
      </Flex>
    </Container>
  )
}

export default Signup
