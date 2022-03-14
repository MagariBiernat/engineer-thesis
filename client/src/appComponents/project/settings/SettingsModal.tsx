import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react"
import React from "react"
import { MdSettings } from "react-icons/md"
import { useTypedSelector } from "redux/store"

const SettingsModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const project = useTypedSelector((state) => state.currentProject.project)

  return (
    <>
      <Button onClick={onOpen}>
        <MdSettings
          size={"18px"}
          color={useColorModeValue("#252424", "#d8d8d8")}
        />
      </Button>

      <Modal
        motionPreset="slideInBottom"
        size="xl"
        onClose={onClose}
        isOpen={isOpen}
      >
        <ModalOverlay className="filterblur4" />
        <ModalContent pb={5}>
          <ModalHeader>Project settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default SettingsModal
