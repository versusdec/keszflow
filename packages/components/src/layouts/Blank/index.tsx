import { ReactElement } from 'react'
import Head from 'next/head'
import { Box } from '@mui/material'

interface Props {
  children?: ReactElement
  title?: string
}

export default function BlankLayout(props: Props) {
  return (
    <>
      <Head>
        <title>{props.title ? props.title + ' | Keszflow' : 'Keszflow'} </title>
        <link rel="icon" href="/img/keszflow_logo.png" type="image/png" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <Box
        sx={
          {
            /* position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          display: 'flex',
          flexGrow: 1,
          bgcolor: 'action.focus', */
          }
        }
      >
        {props.children}
      </Box>
    </>
  )
}
