import { ReactElement } from 'react'
import { Box } from '@mui/material'

import { Head } from '@keszflow/components'

interface Props {
  children?: ReactElement
  title?: string
}

export default function BlankLayout(props: Props) {
  return (
    <>
      <Head title={props.title} />
      <Box>{props.children}</Box>
    </>
  )
}
