import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Container,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import Navigation from "components/Navigation"
import { useAuth } from "context/AuthContext"
import React from "react"
import { useNavigate } from "react-router"

const backendURL = process.env.REACT_APP_BACKEND_URL

const initialFormValues = {
  email: "",
  password: "",
}

const Login = () => {
  const [formValues, setFormValues] = React.useState(initialFormValues)
  const [error, setError] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const { setUser } = useAuth()
  const navigate = useNavigate()

  const handleSubmitForm = (event: React.FormEvent) => {
    event.preventDefault()

    setError("")
    setLoading(true)

    const { email, password } = formValues

    if (!email || !password) {
      setError("Please fill every input")
    }

    fetch(`${backendURL}/auth/login`, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          return setError("Wrong credentials")
        }
      })
      .then((res) => {
        if (res?.success) {
          setUser({
            _id: res?._id,
            fullName: res?.fullName,
            token: res?.token,
            profilePicture: res?.profilePicture,
          })
          navigate("/app")
        } else {
          throw "Error"
        }
      })
      .catch((err) => {
        console.warn(err)
      })
    setLoading(false)
  }

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value })
  }

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
            <Stack spacing={4} as="form" onSubmit={handleSubmitForm}>
              {error && (
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  width="full"
                  py={4}
                  bg="red.700"
                  rounded="lg"
                >
                  <Text fontStyle="italic" fontSize="sm">
                    {error}
                  </Text>
                </Box>
              )}
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" name="email" onChange={handleInputChange} />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  onChange={handleInputChange}
                />
              </FormControl>
              <Stack spacing={10}>
                {/* <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color={"blue.400"}>Forgot password?</Link>
                </Stack> */}

                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"center"}
                  p={1}
                  justify={"space-between"}
                >
                  <Text> Not a user ?</Text>
                  <Text
                    decoration="underline"
                    cursor="pointer"
                    _hover={{
                      color: "orange.500",
                    }}
                    onClick={() => navigate("/signup")}
                  >
                    Sign up
                  </Text>
                </Stack>
                <Button
                  type="submit"
                  bg={"orange.400"}
                  color={"white"}
                  _hover={{
                    bg: "orange.500",
                  }}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Container>
  )
}

export default Login
