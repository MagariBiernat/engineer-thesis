import { Box, Flex, Grid, Spinner, useDisclosure } from "@chakra-ui/react"
import { QueryStatus } from "@reduxjs/toolkit/dist/query"
import DndList from "appComponents/project/DndList"
import TaskDetailsModal from "appComponents/project/TaskDetailsModal"
import TopBar from "appComponents/project/TopBar"

import { columnInterface } from "lib/types/project"
import React from "react"
import { useParams } from "react-router-dom"
import { useGetProjectQuery } from "redux/services/projects"
import { reset } from "redux/slices/currentProject"
import { useAppDispatch, useTypedSelector } from "redux/store"
import styled from "styled-components"

interface Context {
  isOpen: boolean
  onOpen: (v: string) => void
  onClose: () => void
}

const TaskDetailsModalContext = React.createContext<Context>(null!)

export const useTaskDetailsModal = () =>
  React.useContext(TaskDetailsModalContext)

const ProjectWrapper = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [taskId, setTaskId] = React.useState("")
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    dispatch(reset())

    return () => {
      dispatch(reset())
    }
  }, [])

  const onOpenModal = (taskId: string) => {
    setTaskId(taskId)
    onOpen()
  }

  const onCloseModal = () => {
    setTaskId("")
    onClose()
  }

  return (
    <>
      <TaskDetailsModalContext.Provider
        value={{ isOpen, onOpen: onOpenModal, onClose: onCloseModal }}
      >
        <Project />
        {isOpen && (
          <TaskDetailsModal taskId={taskId} isOpen={isOpen} onClose={onClose} />
        )}
      </TaskDetailsModalContext.Provider>
    </>
  )
}

const Project = () => {
  const { id = "" } = useParams()
  const columnsState = useTypedSelector(
    (state) => state.currentProject.project.columns
  )!
  const { shouldRefetch } = useTypedSelector((state) => state.currentProject)
  const { refetch } = useGetProjectQuery({
    id,
  })
  const isLoading = useTypedSelector(
    (state) =>
      Object.values(state.currentProjectsApi.queries).some(
        (entry) => entry?.status === QueryStatus.pending
      ) ||
      Object.values(state.projectsApi.queries).some(
        (entry) => entry?.status === QueryStatus.pending
      )
  )

  React.useEffect(() => {
    if (shouldRefetch) refetch()
  }, [shouldRefetch])

  React.useEffect(() => {
    refetch()
  }, [id])

  return (
    <>
      <Flex
        direction="column"
        width="100%"
        p={5}
        pt={6}
        maxW="100%"
        position="relative"
      >
        <TopBar />
        <Box overflow="auto" minH="280px">
          <DndList columnsState={columnsState} />
          {isLoading && (
            <LoadingOverlay>
              <Spinner size="xl" />
            </LoadingOverlay>
          )}
        </Box>
      </Flex>
    </>
  )
}

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(20, 20, 20, 0.3);
  backdrop-filter: blur(2px);
  z-index: 1;
`

export default ProjectWrapper
