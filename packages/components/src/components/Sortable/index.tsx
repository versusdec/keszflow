import React, {
  useState,
  useRef,
  ReactElement,
  ReactComponentElement,
  useEffect,
  useCallback,
  useMemo,
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
  const dragItem = useRef(-1)
  const dragOverItem = useRef(-1)

  useEffect(() => {
    console.log('items changed')
    setList(items)
  }, [items])

  console.log(list)
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
    // setList(copyListItems);
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
        key={index}
        draggable
      >
        <Component item={item} index={index} />
      </Box>
    ))
  }, [list])

  return (
    <>
      {list &&
        list.map((item, index) => (
          <Box
            onDragStart={(e) => dragStart(e, index)}
            onDragEnter={(e) => dragEnter(e, index)}
            onDragOver={(e) => e.preventDefault()}
            onDragEnd={drop}
            key={index}
            draggable
          >
            <Component item={item} index={index} {...rest} />
          </Box>
        ))}
    </>
  )
}

export default Sortable
