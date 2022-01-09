import jwtDecode from "jwt-decode"

interface IData {
  token: string
}

export default function validate(data: IData): boolean {
  const idFromToken = jwtDecode(data.token)
  return true
  // return idFromToken.id === data.
}
