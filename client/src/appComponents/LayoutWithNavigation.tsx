import React, { ReactNode } from "react"
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useColorMode,
} from "@chakra-ui/react"
import {
  FiHome,
  FiTrendingUp,
  FiMenu,
  FiBell,
  FiChevronDown,
} from "react-icons/fi"
import { IconType } from "react-icons"
import { ReactText } from "react"
import { useLocation, useNavigate } from "react-router"
import ThemeToggleButton from "components/ThemeToggleButton"
import { useAppDispatch } from "redux/store"
import { logout } from "redux/slices/authSlice"
import { User } from "redux/services/auth"

interface LinkItemProps {
  name: string
  icon: IconType
  href: string
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Dashboard", icon: FiHome, href: "/app/" },
  { name: "Projects", icon: FiTrendingUp, href: "/app/projects" },
]

export default function Layout({
  children,
  user,
}: {
  children: ReactNode
  user: User
}) {
  const dispatch = useAppDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleLogoutUser = () => {
    return dispatch(logout())
  }

  return (
    <Box>
      {isOpen && <SidebarContent onClose={onClose} />}
      <MobileNav
        onOpen={onOpen}
        handleLogoutUser={handleLogoutUser}
        fullName={user.fullName}
        profilePicture={user.profilePicture}
      />
      <Box p="4">{children}</Box>
    </Box>
  )
}

interface SidebarProps extends BoxProps {
  onClose: () => void
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const navigate = useNavigate()

  return (
    <Box
      transition="3s ease"
      borderBottom="1px"
      borderBottomColor={useColorModeValue("rgba(20,20,20, .2)", "gray.900")}
      display={{ base: "block", md: "none" }}
      background={useColorModeValue("#fafafa", "#020202")}
      w={{ base: "full" }}
      pb={4}
      borderBottomRadius={"md"}
      pos="fixed"
      left="0"
      right="0"
      h="auto"
      zIndex={1}
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          name={link.name}
          icon={link.icon}
          href={link.href}
          onClick={() => navigate(`${link.href}`)}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  )
}

interface NavItemProps extends FlexProps {
  icon: IconType
  children: ReactText
  href: string
  name: string
}
const NavItem = ({ icon, children, href, name, ...rest }: NavItemProps) => {
  const location = useLocation()
  let active = location.pathname === href
  const colorActive = useColorModeValue("#000", "#fffafa")
  const headingColor = useColorModeValue(
    "rgb(128,136,154)",
    "rgba(242,245,248, .6)"
  )
  if (location.pathname === "/app" && name === "Dashboard") {
    active = true
  }
  return (
    <Link style={{ textDecoration: "none" }}>
      <Flex
        align="center"
        p="6"
        py={2}
        m={2}
        borderRadius="md"
        role="group"
        cursor="pointer"
        color={active ? "#fafafa" : headingColor}
        boxShadow=""
        bg={active ? "#00b0ff" : "transparent"}
        _hover={{
          bg: "#00b0ff",
          color: "white",
        }}
        letterSpacing="1.1px"
        {...rest}
      >
        {children}
      </Flex>
    </Link>
  )
}

interface MobileProps extends FlexProps {
  onOpen: () => void
  handleLogoutUser: () => void
  fullName: string
  profilePicture: string
}
export const MobileNav = ({
  onOpen,
  handleLogoutUser,
  fullName,
  profilePicture,
  ...rest
}: MobileProps) => {
  const navigate = useNavigate()
  return (
    <Flex
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between" }}
      {...rest}
    >
      <Box display={{ base: "none", md: "flex" }}>
        {LinkItems.map((link) => (
          <NavItem
            key={link.name}
            name={link.name}
            icon={link.icon}
            href={link.href}
            onClick={() => navigate(`${link.href}`)}
          >
            {link.name}
          </NavItem>
        ))}
      </Box>
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      {/* <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text> */}

      <HStack spacing={{ base: "0", md: "6" }}>
        <ThemeToggleButton />
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="xs" color="gray.600">
                    Hello
                  </Text>
                  <Text fontSize="sm">{fullName}</Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              borderColor={useColorModeValue("gray.200", "gray.700")}
              bg={useColorModeValue("#33bfff", "gray.200")}
              color={useColorModeValue("gray.100", "gray.900")}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem
                borderBottom="1px solid"
                borderBottomColor={useColorModeValue("gray100", "gray.600")}
              >
                Billing
              </MenuItem>
              <MenuItem onClick={handleLogoutUser}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  )
}
