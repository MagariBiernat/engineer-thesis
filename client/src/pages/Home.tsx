import { Container } from "@chakra-ui/react"
import Heading from "components/HomeComponents/Heading"
import Testimonials from "components/HomeComponents/Testimonials"
import Navigation from "components/Navigation"
import React from "react"

const Home = () => {
  return (
    <Container maxW={"full"}>
      <Navigation />
      <Heading />
      <Testimonials />
    </Container>
  )
}

export default Home
