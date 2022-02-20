import {
  Stack,
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react"
import React from "react"

import { useNavigate } from "react-router"
import { useLoginMutation } from "redux/services/auth"
import { useTypedSelector } from "redux/store"

const initialFormValues = {
  email: "",
  password: "",
}
const LoginForm = () => {
  const { user } = useTypedSelector((state) => state.auth)
  const [login, { isLoading, isSuccess, isError }] = useLoginMutation()
  const [formValues, setFormValues] = React.useState(initialFormValues)
  const [error, setError] = React.useState("")
  const navigate = useNavigate()

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value })
  }

  const handleSubmitForm = async (event: React.FormEvent) => {
    event.preventDefault()

    if (Object.values(formValues).filter((i) => i).length !== 2) {
      return setError("Please fill the form")
    }

    await login(formValues)
  }

  React.useEffect(() => {
    if (isError) {
      setError("Error occurred")
    }
  }, [isError])

  React.useEffect(() => {
    if (user && user.token) {
      navigate("/app")
    }
  }, [user, isSuccess])

  return (
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
        <Input type="password" name="password" onChange={handleInputChange} />
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
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Sign in"}
        </Button>
      </Stack>
    </Stack>
  )
}

export default LoginForm
