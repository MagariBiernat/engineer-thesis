import {
  Flex,
  Box,
  Stack,
  Link,
  Container,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import LoginForm from "components/Login/LoginForm"
import Navigation from "components/Navigation"

const Login = () => {
  return (
    <Container maxW="full">
      <Navigation />
      <Flex minH={"60vh"} align={"center"} justify={"center"}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign in to your account</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool <Link color={"blue.400"}>features</Link>
              ✌️
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.900")}
            boxShadow={"dark-lg"}
            p={8}
          >
            <LoginForm />
          </Box>
        </Stack>
      </Flex>
    </Container>
  )
}

export default Login
