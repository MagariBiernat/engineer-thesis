import { Grid } from "@chakra-ui/react"
import DndList from "appComponents/project/DndList"
import TopBar from "appComponents/project/TopBar"
import { BACKEND_URI } from "lib/config"
import useFetch from "lib/hooks/useFetch"
import { projectInterface } from "lib/types/project"
import { useLocation, useParams } from "react-router-dom"

const Project = () => {
  // const { id } = useParams()
  // const location = useLocation()

  // const { response, error, loading } = useFetch(
  //   `${BACKEND_URI}/projects/project?projectId=${id}`,
  //   "GET",
  //   user!.token
  // )

  // if (loading) return <>loading...</>
  // if (error) return <>ojc error ${error}</>

  // if (response) {
  //   const data = response as projectInterface
  //   //TODO: DIFFERNT LAYOUT
  //   return (
  //     <>
  //       <Grid p={6} pt={12}>
  //         <TopBar />
  //         <DndList initial={data.columns!} withScrollableColumns />
  //       </Grid>
  //     </>
  //   )
  // }

  return <></>
}

export default Project
