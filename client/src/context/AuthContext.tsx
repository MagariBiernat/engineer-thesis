import React from "react"

export type User = {
  _id: string
  fullName: string
  token: string
  profilePicture: string
}

interface AuthContextType {
  user?: User
  setUser: (v: User | undefined) => void
}

const localStorageName = "userInfoContext"

export const AuthContext = React.createContext<AuthContextType>(null!)

export const useAuth = () => {
  return React.useContext(AuthContext)
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = React.useState<User | undefined>(
    JSON.parse(localStorage.getItem(localStorageName)!) || null!
  )

  const setUserAndToken = (userInfo: User | undefined) => {
    setUser(userInfo)
    if (userInfo) {
      localStorage.setItem(localStorageName, JSON.stringify(userInfo))
    } else {
      localStorage.removeItem(localStorageName)
    }
  }

  const value = { user, setUser: setUserAndToken }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
