import jwtDecode from "jwt-decode"

export default function decodeToken(token: string): {
  id: string
  email: string
} {
  const decoded: any = jwtDecode(token)
  return { id: decoded.id, email: decoded.email }
}
