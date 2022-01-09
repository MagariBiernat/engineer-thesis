import Layout from "appComponents/LayoutWithNavigation"
import { useAuth } from "context/AuthContext"
import React from "react"
import { Outlet } from "react-router"

const App = () => {
  const auth = useAuth()

  return (
    <Layout setAuth={auth.setUser} user={auth.user!}>
      <Outlet />
    </Layout>
  )
}

export default App
