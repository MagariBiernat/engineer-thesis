import React from "react"
import { Navigate, useLocation } from "react-router"
import jwtDecode from "jwt-decode"
import { useAppDispatch, useTypedSelector } from "redux/store"
import { logout } from "redux/slices/authSlice"

interface Decoded {
  id: string
  email: string
  iat: number
  exp: number
}

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useTypedSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const location = useLocation()

  React.useEffect(() => {
    if (user) {
      const decoded: Decoded = jwtDecode(user.token)

      if (Date.now() >= decoded.exp * 1000) {
        dispatch(logout())
      }
    }
  }, [location])

  if (!user) return <Navigate to="/login" state={{ from: location }} />

  return children
}

export default ProtectedRoute
