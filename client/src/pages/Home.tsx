import { Container } from "@chakra-ui/react"
import Heading from "components/Home/Heading"
import Testimonials from "components/Home/Testimonials"
import Navigation from "components/Navigation"

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
