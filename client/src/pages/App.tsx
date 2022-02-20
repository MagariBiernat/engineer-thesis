import Layout from "appComponents/LayoutWithNavigation"
import { Outlet } from "react-router"
import { useTypedSelector } from "redux/store"

const App = () => {
  const { user } = useTypedSelector((state) => state.auth)

  return (
    <Layout user={user!}>
      <Outlet />
    </Layout>
  )
}

export default App
