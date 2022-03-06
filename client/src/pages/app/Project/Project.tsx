import { Grid, useDisclosure } from "@chakra-ui/react"
import DndList from "appComponents/project/DndList"
import TaskDetailsModal from "appComponents/project/TaskDetailsModal"
import TopBar from "appComponents/project/TopBar"

import { columnInterface } from "lib/types/project"
import React from "react"
import { useParams } from "react-router-dom"
import { useGetProjectQuery } from "redux/services/projects"

interface Context {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const TaskDetailsModalContext = React.createContext<Context>(null!)

export const useTaskDetailsModal = () =>
  React.useContext(TaskDetailsModalContext)

const ProjectWrapper = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <TaskDetailsModalContext.Provider value={{ isOpen, onOpen, onClose }}>
        <Project />
        {isOpen && <TaskDetailsModal isOpen={isOpen} onClose={onClose} />}
      </TaskDetailsModalContext.Provider>
    </>
  )
}

const Project = () => {
  const { id = "" } = useParams()
  const [columns, setColumns] = React.useState<columnInterface[]>([])
  const { data, isLoading, isError, isSuccess } = useGetProjectQuery({ id })

  React.useEffect(() => {
    setColumns(data?.columns!)
  }, [isSuccess])

  return (
    <>
      <Grid p={6} pt={12} maxW="100%">
        <TopBar />
        <DndList columns={columns} setColumns={setColumns} />
      </Grid>
    </>
  )
}

export default ProjectWrapper
