import { ReactElement } from 'react'
import { Box } from '@mui/material'

import { Head } from '@keszflow/components'

interface Props {
  children?: ReactElement
  title?: string
}

export default function BlankLayout(props: Props) {
  const title = props.title
    ? props.title
    : props.children?.props.title
    ? props.children.props.title
    : false

  return (
    <>
      <Head title={title} />
      <Box>{props.children}</Box>
    </>
  )
}
