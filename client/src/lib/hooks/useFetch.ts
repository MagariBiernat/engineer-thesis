import { ServerResponse } from "http"
import { allProjectsFetchInterface } from "lib/types/project"
import React from "react"

type responseType = {
  data: allProjectsFetchInterface
}

const useFetch = (url: string, method: string, token: string) => {
  const [response, setResponse] = React.useState<Partial<responseType>>()
  const [error, setError] = React.useState<unknown>(null)
  const [loading, setLoading] = React.useState(false)

  const options: RequestInit = {
    method: method,
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  }

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      try {
        const res = await fetch(url, options)
        const json = await res.json()

        setResponse(json)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (error) {
    console.error(error)
  }

  return { response, error, loading }
}

export default useFetch
