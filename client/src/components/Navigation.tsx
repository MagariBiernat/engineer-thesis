import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react"
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons"
import { useNavigate } from "react-router"
import Logo from "assets/images/Logo.png"
import ThemeToggleButton from "./ThemeToggleButton"
import { selectIsAuthenticated } from "redux/slices/authSlice"
import { useSelector } from "react-redux"

export default function WithSubnavigation() {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const { isOpen, onToggle } = useDisclosure()
  const navigate = useNavigate()

  return (
    <Box>
      <Flex
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.700")}
        align={"center"}
      >
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
            onClick={() => navigate("/")}
            cursor="pointer"
          >
            <img width="70px" src={Logo} alt="Logo" />
          </Text>

          {/*  //FIXME :) */}
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <ThemeToggleButton />
          {isAuthenticated ? (
            <Button
              onClick={() => navigate("/app")}
              fontSize={"sm"}
              fontWeight={600}
              color={"black"}
              bg={"orange.400"}
              _hover={{
                bg: "orange.500",
              }}
            >
              Go to App
            </Button>
          ) : (
            <>
              <Button
                fontSize={"sm"}
                fontWeight={400}
                variant={"link"}
                onClick={() => navigate("/login")}
              >
                Log in
              </Button>
              <Button
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={600}
                color={"black"}
                bg={"orange.400"}
                onClick={() => navigate("/signup")}
                _hover={{
                  bg: "orange.500",
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity></Collapse>
    </Box>
  )
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200")
  const linkHoverColor = useColorModeValue("gray.800", "white")
  const popoverContentBgColor = useColorModeValue("white", "gray.800")

  return <Stack direction={"row"} spacing={4}></Stack>
}
