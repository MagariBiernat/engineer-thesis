import { Box, Button, Flex } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import NewTask from "./dnd/NewTaskModal"

const GoBack = () => {
  const navigate = useNavigate()
  const handleGoBack = () => {
    navigate("/app/projects")
  }

  return (
    <Box>
      <Button variant="solid" onClick={handleGoBack}>
        Go back
      </Button>
    </Box>
  )
}

const TopBar = () => {
  return (
    <Flex justifyContent={"space-between"}>
      <GoBack />
      <NewTask />
    </Flex>
  )
}

export default TopBar
