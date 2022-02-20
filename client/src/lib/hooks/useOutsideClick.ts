import React from "react"

export default function func(
  callback: Function,
  ref: React.RefObject<HTMLElement>
) {
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref?.current && ref?.current.contains(event.target as Element)) {
        callback()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [ref])
}
