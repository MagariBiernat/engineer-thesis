import { taskInterface } from "lib/types/project"
import React from "react"
import { useDrag, useDrop } from "react-dnd"

interface Props {
  item: taskInterface
  index: number
  moveItem: Function
  status: boolean
}

const ITEM_TYPE = "ITEM"

const Item = ({ item, index, moveItem, status }: Props) => {
  const ref = React.useRef(null)

  // const [, drop] = useDrop({
  //   accept: ITEM_TYPE,
  //   hover(item, monitor) {
  //     if (!ref.current) {
  //       return
  //     }

  //     const dragIndex = item.index
  //     const hoverIndex = index

  //     if (dragIndex === hoverIndex) return

  //     const hoveredRect = ref.current.getBoundClientRec()
  //     const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2
  //     const mousePosition = monitor.getClientOffset()
  //     const hoverClientY = mousePosition.y - hoveredRect.top

  //     if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
  //     if (dragIndex > hoverIndex && hoverClientY < hoverMiddleY) return

  //     moveItem(dragIndex, hoverIndex)
  //     item.index = hoverIndex
  //   },
  // })

  // const [{ isDragging }, drag] = useDrag({
  //   item: { type: ITEM_TYPE, ...item, index },
  //   collect: (monitor) => ({
  //     isDragging: monitor.isDragging(),
  //   }),
  // })

  const [show, setShow] = React.useState(false)

  const onOpen = () => setShow(true)

  const onClose = () => setShow(false)

  console.log(show)

  // drag(drop(ref))

  return (
    <>
      <div ref={ref} onClick={onOpen}>
        <p>{item.title}</p>
      </div>
    </>
  )
}

export default Item
