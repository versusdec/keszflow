import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  PropsWithChildren,
  FC,
} from 'react'
import { Box } from '@mui/material'

export interface ISortable {
  items: any[]
  Component?: any
  onChange?: (list: any[]) => void

  [rest: string]: any
}

const Sortable = ({ items, Component, onChange, ...rest }: ISortable) => {
  const [list, setList] = useState<any[]>(items)
  const [draggable, setDraggable] = useState(true)
  const dragItem = useRef(-1)
  const dragOverItem = useRef(-1)

  useEffect(() => {
    setList(items)
  }, [items])

  const isDraggable = (e: React.MouseEvent<HTMLElement>) => {
    const { nodeName } = e.target as HTMLElement
    if (nodeName === 'INPUT') setDraggable(false)
    else setDraggable(true)
  }

  const dragStart = (e: React.MouseEvent<HTMLElement>, position: number) => {
    dragItem.current = position
  }

  const dragEnter = (e: React.MouseEvent<HTMLElement>, position: number) => {
    dragOverItem.current = position
  }

  const drop = (e: React.MouseEvent<HTMLElement>) => {
    const copyListItems = [...list]
    const dragItemContent = copyListItems[dragItem.current]
    copyListItems.splice(dragItem.current, 1)
    copyListItems.splice(dragOverItem.current, 0, dragItemContent)
    dragItem.current = -1
    dragOverItem.current = -1
    if (onChange) {
      onChange(copyListItems)
    } else {
      setList(copyListItems)
    }
  }

  const ListJSX = useMemo(() => {
    return list.map((item, index) => (
      <Box
        onDragStart={(e) => dragStart(e, index)}
        onDragEnter={(e) => dragEnter(e, index)}
        onDragOver={(e) => e.preventDefault()}
        onDragEnd={drop}
        onPointerDown={(e) => isDraggable(e)}
        key={index}
        draggable={draggable}
      >
        <Component item={item} index={index} {...rest} />
      </Box>
    ))
  }, [list, draggable])

  return <>{list && ListJSX}</>
}

export default Sortable
