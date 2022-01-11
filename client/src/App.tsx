import Home from "pages/Home"
import Login from "pages/Login"
import Signup from "pages/Signup"
import MainApp from "pages/App"

import Dashboard from "pages/app/Dashboard"
import Projects from "pages/app/Projects"

import { Container } from "@chakra-ui/layout"
import { Routes, Route } from "react-router"
import ProtectedRoute from "utils/ProtectedRoute"
import Project from "pages/app/Project"

function App() {
  return (
    <Container maxW="full" className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <MainApp />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="projects" element={<Projects />} />
          <Route path="project/:id" element={<Project />} />
        </Route>
      </Routes>
    </Container>
  )
}

export default App
