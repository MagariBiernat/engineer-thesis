import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  Flex,
  Text,
  Box,
  Spinner,
  InputGroup,
  Input,
  Divider,
  WrapItem,
  Avatar,
} from "@chakra-ui/react"
import { QueryStatus } from "@reduxjs/toolkit/dist/query"
import React from "react"
import { FaTasks } from "react-icons/fa"
import { MdOutlineSort } from "react-icons/md"
import { useParams } from "react-router-dom"
import { useGetTaskQuery } from "redux/services/currentProject"
import { useTypedSelector } from "redux/store"
import TaskDetailsModalComments from "./TaskDetailsModalComments"

interface Props {
  taskId: string
  isOpen: boolean
  onClose: () => void
}

const TaskDetailsModal: React.FC<Props> = ({ taskId, isOpen, onClose }) => {
  const { id = "" } = useParams()
  const { data, isLoading, isFetching, isError, isSuccess, refetch } =
    useGetTaskQuery({
      projectId: id,
      taskId,
    })

  const handleRefetch = () => refetch()

  console.log(taskId)

  return (
    <Modal
      blockScrollOnMount
      size={"3xl"}
      motionPreset="slideInBottom"
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay className="filterblur4" />
      <ModalContent minH="260px" position="relative">
        {isLoading && (
          <Box
            pos="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            display="flex"
            flexDir="column"
            gap="24px"
            alignItems="center"
            justifyContent="center"
          >
            <Spinner size="xl" />
            <p>Loading...</p>
          </Box>
        )}
        {isError && (
          <Box display="flex" alignItems="center" justifyContent="center">
            Error happened
          </Box>
        )}

        {data && (
          <>
            <ModalHeader>
              <Flex align="center" gap="18px">
                <FaTasks size={20} />
                {data.title}
              </Flex>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex justifyContent={"space-between"}>
                <Flex direction="column" w="full">
                  <Flex alignItems="flex-start" gap="18px" mb={24}>
                    <MdOutlineSort size={24} />
                    <Flex flexDir={"column"} justifyContent="flex-start">
                      <Text mb={4}>Description</Text>
                      <Divider mb={2} />
                      {data.description ? (
                        <Text>{data.description}</Text>
                      ) : (
                        <Text fontSize="sm">No description</Text>
                      )}
                    </Flex>
                  </Flex>

                  <TaskDetailsModalComments
                    comments={data?.comments}
                    taskId={taskId}
                    handleRefetch={handleRefetch}
                  />
                </Flex>

                {/* sidebar right */}
                <Flex direction={"column"} maxW="20%" gap="6px"></Flex>
              </Flex>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default TaskDetailsModal
