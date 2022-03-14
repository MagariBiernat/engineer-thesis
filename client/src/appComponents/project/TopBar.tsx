import {
  Box,
  Button,
  Divider,
  Flex,
  MenuDivider,
  useColorModeValue,
} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import { MdSettings } from "react-icons/md"
import NewTask from "./dnd/NewTaskModal"
import { useTypedSelector } from "redux/store"
import { ArrowLeftIcon } from "@chakra-ui/icons"
import SettingsModal from "./settings/SettingsModal"
import PrivateSection from "./PrivateSection"
import ShareOptions from "./ShareOptions"

const GoBack = () => {
  const navigate = useNavigate()
  const handleGoBack = () => {
    navigate("/app/projects")
  }

  return (
    <Box>
      <Button variant="solid" onClick={handleGoBack}>
        <ArrowLeftIcon />
      </Button>
    </Box>
  )
}

const TopBar = () => {
  const columns = useTypedSelector(
    (state) => state.currentProject.project.columns
  )?.filter((i) => i)
  const { _id } = useTypedSelector((state) => state.auth.user!)
  const { owner } = useTypedSelector((state) => state.currentProject.project)

  const isOwner = _id === owner

  return (
    <Flex justifyContent={"space-between"} maxW="100%" w="100%">
      <Flex gap="12px">
        <GoBack />
        <SettingsModal />
        <Divider orientation="vertical" />
        {isOwner && (
          <>
            <PrivateSection />
            <ShareOptions />
          </>
        )}
      </Flex>
      {columns && columns.length > 0 && <NewTask columns={columns} />}
    </Flex>
  )
}

export default TopBar
