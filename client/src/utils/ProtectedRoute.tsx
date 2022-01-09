import { useAuth } from "context/AuthContext"
import React from "react"
import { Navigate, useLocation } from "react-router"
import jwtDecode from "jwt-decode"

interface Decoded {
  id: string
  email: string
  iat: number
  exp: number
}

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth()
  const location = useLocation()

  React.useEffect(() => {
    if (auth.user) {
      const decoded: Decoded = jwtDecode(auth.user.token)

      if (Date.now() >= decoded.exp * 1000) {
        auth.setUser(undefined)
        //FIXME: implement toast
      }
    }
  }, [location])

  if (!auth.user) return <Navigate to="/login" state={{ from: location }} />

  return children
}

export default ProtectedRoute
