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
} from "@chakra-ui/react"
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from "react-icons/fi"
import { IconType } from "react-icons"
import { ReactText } from "react"
import { User } from "context/AuthContext"
import { useLocation, useNavigate } from "react-router"

interface LinkItemProps {
  name: string
  icon: IconType
  href: string
}
const LinkItems: Array<LinkItemProps> = [
  { name: "Dashboard", icon: FiHome, href: "/app/" },
  { name: "Projects", icon: FiTrendingUp, href: "/app/projects" },
  // { name: "Explore", icon: FiCompass },
  // { name: "Favourites", icon: FiStar },
  // { name: "Settings", icon: FiSettings },
]

export default function Layout({
  children,
  setAuth,
  user,
}: {
  children: ReactNode
  setAuth: (v: any | undefined) => void
  user: User
}) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleLogoutUser = () => {
    return setAuth(undefined)
  }

  return (
    <Box minH="100vh">
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav
        onOpen={onOpen}
        handleLogoutUser={handleLogoutUser}
        fullName={user.fullName}
        profilePicture={user.profilePicture}
      />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
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
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.900")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
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
  const active = location.pathname === href
  console.log(location.pathname, href, name)
  return (
    <Link style={{ textDecoration: "none" }}>
      <Flex
        align="center"
        p="4"
        py={2}
        m={4}
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bg={active ? "orange.400" : "transparent"}
        _hover={{
          bg: "orange.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
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
const MobileNav = ({
  onOpen,
  handleLogoutUser,
  fullName,
  profilePicture,
  ...rest
}: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.800")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
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
              bg={useColorModeValue("gray.900", "gray.200")}
              color={useColorModeValue("gray.200", "gray.900")}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem onClick={handleLogoutUser}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  )
}
