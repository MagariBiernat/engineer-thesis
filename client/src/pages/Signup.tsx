import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Select,
  Container,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Spinner,
} from "@chakra-ui/react"
import React from "react"
import Navigation from "components/Navigation"
import { useNavigate } from "react-router"
import { AuthContext, useAuth } from "context/AuthContext"

const backendURL = process.env.REACT_APP_BACKEND_URL

const initialFormValues = {
  fullName: "",
  email: "",
  password: "",
  password2: "",
  gender: "",
}

const Signup = () => {
  const [formValues, setFormValues] = React.useState(initialFormValues)
  const [checkBoxValue, setCheckBoxValue] = React.useState(false)
  const [error, setError] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const { setUser } = useAuth()
  const navigate = useNavigate()

  console.log(formValues)

  const handleSubmitForm = (event: React.FormEvent) => {
    event.preventDefault()

    setError("")
    setLoading(true)

    const { fullName, email, password, password2 } = formValues

    if (!fullName || !email || !password || !password2) {
      setError("Please fill every input")
    }

    if (password !== password2) {
      setError("Passwords do not match")
    }

    fetch(`${backendURL}/auth/signup`, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    })
      .then((res) => {
        return res.json()
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
        console.log(err)
      })

    console.log(formValues)

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
              <FormControl id="fullName">
                <FormLabel fontSize="sm" pb={1}>
                  Full Name
                </FormLabel>
                <Input
                  placeholder="John Doe"
                  required
                  type="fullName"
                  name="fullName"
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl id="email">
                <FormLabel fontSize="sm" pb={1}>
                  Email address
                </FormLabel>
                <Input
                  placeholder="johndoe@email.com"
                  required
                  type="email"
                  name="email"
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel fontSize="sm" pb={1}>
                  Gender
                </FormLabel>
                <Select
                  placeholder="-- Choose Gender --"
                  size="md"
                  variant="filled"
                  name="gender"
                  onChange={handleInputChange}
                >
                  <option value="female"> Female </option>
                  <option value="male"> Male </option>
                </Select>
              </FormControl>

              <FormControl id="password">
                <FormLabel fontSize="sm" pb={1}>
                  Password
                </FormLabel>
                <Input
                  placeholder="**********"
                  required
                  type="password"
                  name="password"
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl id="password2">
                <FormLabel fontSize="sm" pb={1}>
                  Confirm Password
                </FormLabel>
                <Input
                  placeholder="**********"
                  required
                  type="password"
                  name="password2"
                  onChange={handleInputChange}
                />
              </FormControl>
              <Stack spacing={4}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  flexWrap="wrap"
                >
                  <Checkbox
                    defaultChecked={checkBoxValue}
                    onChange={() => setCheckBoxValue(!checkBoxValue)}
                  >
                    <Text fontSize="14px" fontStyle="italic" p={2}>
                      I accept Terms and have read and <br />
                      acknolwedged privacy statements.
                    </Text>
                  </Checkbox>
                </Stack>

                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"center"}
                  justify={"flex-end"}
                  fontSize="sm"
                >
                  <Text fontStyle="italic"> Already a user ?</Text>
                  <Text
                    fontStyle="italic"
                    decoration="underline"
                    cursor="pointer"
                    _hover={{
                      color: "orange.300",
                    }}
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </Text>
                </Stack>
                <Button
                  display="flex"
                  justifyContent="space-evenly"
                  type="submit"
                  bg={"orange.400"}
                  color={"white"}
                  _hover={{
                    bg: "orange.500",
                  }}
                  disabled={loading || !checkBoxValue}
                >
                  {loading && <Spinner />}
                  Sign up
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Container>
  )
}

export default Signup
