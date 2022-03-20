import {
  Box,
  Flex,
  InputGroup,
  WrapItem,
  Avatar,
  Input,
  Text,
  Divider,
  useColorModeValue,
  MenuIcon,
  Tooltip,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useToast,
} from "@chakra-ui/react"
import { commentsInterface } from "lib/types/project"
import React from "react"
import { MdOutlineSort } from "react-icons/md"
import {
  useAddCommentMutation,
  useDeleteCommentMutation,
} from "redux/services/comments"
import { useTypedSelector } from "redux/store"
import { RiChatDeleteLine } from "react-icons/ri"
import styled from "styled-components"

interface Props {
  taskId: string
  comments: commentsInterface[]
  handleRefetch: () => void
}

const TaskDetailsModalComments: React.FC<Props> = ({
  taskId,
  comments = [],
  handleRefetch,
}) => {
  const { fullName } = useTypedSelector((state) => state.auth.user)!
  const [content, setContent] = React.useState("")
  const [addCommentMutationQuery, { isSuccess }] = useAddCommentMutation()
  const addComment = async () => addCommentMutationQuery({ content, taskId })
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (!content) alert("Comment must have a value")

    addComment()
  }

  React.useEffect(() => {
    isSuccess && handleRefetch()
  }, [isSuccess])

  return (
    <Flex w="full" direction="column">
      <Flex align={"center"} alignItems="flex-start">
        <Box w="50px">
          <MdOutlineSort size={24} />
        </Box>
        <Text>Comments</Text>
      </Flex>
      <Divider my={4} />
      <Flex direction="column" maxH="300px" overflowY="auto">
        {comments.length === 0 ? (
          <Text my={4} fontSize="x-small">
            No comments yet
          </Text>
        ) : (
          comments.map((item, index) => (
            <Comment
              taskId={taskId}
              key={index}
              item={item}
              handleRefetch={handleRefetch}
            />
          ))
        )}
      </Flex>
      <InputGroup
        flexDirection="row"
        alignItems="center"
        gap="18px"
        mt={12}
        as="form"
        onSubmit={handleSubmit}
      >
        <WrapItem>
          <Avatar size="sm" name={fullName} />
        </WrapItem>
        <Input
          w="full"
          fontSize="smaller"
          variant="filled"
          placeholder="Write a comment"
          onChange={(e) => setContent(e.target.value)}
        />
      </InputGroup>
    </Flex>
  )
}

interface Prop {
  taskId: string
  item: commentsInterface
  handleRefetch: () => void
}

const Comment: React.FC<Prop> = ({ item, taskId, handleRefetch }) => {
  console.log(item)
  const dateCreated = item.createdAt
    .toString()
    .split("T")[0]
    .replaceAll("-", " ")

  const bgOnHover = useColorModeValue(
    "rgba(240,240,240,.3)",
    "rgba(30,35,37, .2)"
  )
  const { _id } = useTypedSelector((state) => state.auth.user)!
  const isOwnerOfComment = _id === item.commentedBy._id
  const [deleteCommentMutation, { isSuccess }] = useDeleteCommentMutation()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const deleteComment = async () =>
    deleteCommentMutation({ commentId: item._id, taskId: taskId })
  const cancelRef = React.useRef(null)
  const toast = useToast()

  const handleOnSubmit = () => {
    deleteComment()
    onClose()
  }

  React.useEffect(() => {
    isSuccess && handleRefetch()
  }, [isSuccess])

  React.useEffect(() => {
    isSuccess &&
      toast({
        title: "Success 💪 ",
        duration: 1300,
        description: "Comment was deleted",
        status: "info",
        position: "bottom-end",
        isClosable: true,
      })
  }, [isSuccess])
  return (
    <CommentWrapper
      p={2}
      cursor="pointer"
      pos="relative"
      _hover={{ bg: bgOnHover }}
    >
      <Box w="50px">
        <Avatar size="sm" name={item.commentedBy.fullName} />
      </Box>
      <Box>
        <Text maxW="80%" opacity={0.8}>
          {item.content}
        </Text>
        <Text fontSize="small" mt={1} opacity={0.4}>
          Added: {dateCreated}
        </Text>
      </Box>
      {isOwnerOfComment && (
        <Tooltip label="Delete comment">
          <DeleteIcon pos="absolute" right="20px" top="10%">
            <RiChatDeleteLine onClick={onOpen} />
            <AlertDialog
              motionPreset="slideInBottom"
              leastDestructiveRef={cancelRef}
              onClose={onClose}
              isOpen={isOpen}
              isCentered
            >
              <AlertDialogOverlay />

              <AlertDialogContent>
                <AlertDialogHeader>Discard Changes?</AlertDialogHeader>
                <AlertDialogCloseButton />
                <AlertDialogBody>
                  Are you sure you want to delete Your comment?
                </AlertDialogBody>
                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                    No
                  </Button>
                  <Button colorScheme="red" ml={3} onClick={handleOnSubmit}>
                    Yes
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DeleteIcon>
        </Tooltip>
      )}
    </CommentWrapper>
  )
}

export default TaskDetailsModalComments

const DeleteIcon = styled(Box)`
  opacity: 0;
  transition: opacity 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
`

const CommentWrapper = styled(Flex)`
  &:hover ${DeleteIcon} {
    opacity: 1;
  }
`
