import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import React from "react"
import { useTypedSelector } from "redux/store"
import { MdOutlineShare } from "react-icons/md"
import { AiOutlineMail } from "react-icons/ai"
import { useParams } from "react-router-dom"
import { QueryStatus } from "@reduxjs/toolkit/dist/query"
import { useInviteUserToProjectMutation } from "redux/services/projects"

const ShareOptions = () => {
  const { isOpen, onOpen, onToggle, onClose } = useDisclosure()
  const { isPersonal } = useTypedSelector(
    (state) => state.currentProject.project
  )

  if (isPersonal) return <></>
  return (
    <>
      <Button fontWeight="normal" onClick={onOpen}>
        <MdOutlineShare />{" "}
        <Text ml="2" fontSize="sm">
          Invite
        </Text>
      </Button>
      {isOpen && <ModalInvite isOpen={isOpen} onClose={onClose} />}
    </>
  )
}

interface Props {
  onClose: () => void
  isOpen: boolean
}

const ModalInvite: React.FC<Props> = ({ onClose, isOpen }) => {
  const { id = "" } = useParams()
  const [email, setEmail] = React.useState("")
  const [inviteMutation] = useInviteUserToProjectMutation()
  const toast = useToast()

  const handleInvite = async () =>
    inviteMutation({ projectId: id, email }).unwrap()
  const handleSubmitForm = (event: React.FormEvent) => {
    event.preventDefault()

    if (!email) return alert("Email is required")

    handleInvite()
      .then(() => {
        toast({
          title: "Success 💪 ",
          duration: 1200,
          description: `User was invited to a project successfully`,
          status: "success",
          position: "bottom-end",
          isClosable: true,
        })
        onClose()
      })
      .catch((error) => {
        const { status, data } = error
        toast({
          duration: 2200,
          description: `${data?.message}`,
          status: "warning",
          position: "bottom-end",
          isClosable: true,
        })
      })
  }

  return (
    <Modal
      motionPreset="slideInRight"
      size="sm"
      onClose={onClose}
      isOpen={isOpen}
    >
      <ModalOverlay className="filterblur4" />
      <ModalContent pb={5}>
        <ModalHeader>Invite others...</ModalHeader>
        <ModalCloseButton />
        <ModalBody
          onSubmit={handleSubmitForm}
          as="form"
          display="flex"
          flexDirection="column"
        >
          <InputGroup>
            <InputLeftAddon children={<AiOutlineMail />} />
            <Input
              type="email"
              placeholder="Email..."
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>
          <Button
            alignSelf="flex-end"
            type="submit"
            mt={6}
            variant="outline"
            color="#fff"
            boxShadow="lg"
            border="none"
            bg="blue.400"
            _hover={{ bg: "blue.600" }}
          >
            Send invite
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default ShareOptions
