import {
  Stack,
  Box,
  FormControl,
  FormLabel,
  Text,
  Input,
  Select,
  Checkbox,
  Button,
  Spinner,
} from "@chakra-ui/react"
import React from "react"
import { useNavigate } from "react-router-dom"
import { useRegisterMutation } from "redux/services/auth"
import { useTypedSelector } from "redux/store"

const initialFormValues = {
  fullName: "",
  email: "",
  password: "",
  password2: "",
  gender: "",
}

const SignUpForm = () => {
  const { user } = useTypedSelector((state) => state.auth)
  const [register, { isLoading, isSuccess, isError }] = useRegisterMutation()
  const [formValues, setFormValues] = React.useState(initialFormValues)
  const [checkBoxValue, setCheckBoxValue] = React.useState(false)
  const [error, setError] = React.useState("")
  const navigate = useNavigate()

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value })
  }

  const handleSignup = async () => register(formValues)

  const handleSubmitForm = async (event: React.FormEvent) => {
    event.preventDefault()

    if (formValues.password !== formValues.password2) {
      return setError("Passwords do not match")
    }

    if (Object.values(formValues).filter((i) => i).length !== 5) {
      return setError("Fill all fields")
    }

    handleSignup()
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
          disabled={isLoading || !checkBoxValue}
        >
          {isLoading ? <Spinner /> : "Sign up"}
        </Button>
      </Stack>
    </Stack>
  )
}

export default SignUpForm
