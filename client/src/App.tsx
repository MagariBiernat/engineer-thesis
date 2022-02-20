import Home from "pages/Home"
import Login from "pages/Login"
import Signup from "pages/Signup"
import MainApp from "pages/App"

import Dashboard from "pages/app/Dashboard"
import Projects from "pages/app/Projects"

import { Container } from "@chakra-ui/layout"
import { Routes, Route } from "react-router"
import ProtectedRoute from "utils/ProtectedRoute"
import Project from "pages/app/Project/Project"

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
        </Route>
        <Route path="/app/project/:id" element={<Project />} />
      </Routes>
    </Container>
  )
}

export default App
