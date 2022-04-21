import React, {ReactElement} from 'react'
import {Footer, Header} from '@keszflow/components'
import {Sidebar} from '@keszflow/components'
import Head from 'next/head'
import {Grid, Box, Container} from '@mui/material'

interface Props {
  children?: ReactElement
  title?: string
}

export default function Layout(props: Props) {
  return (
      <>
        <Head>
          <title>{props.title ? props.title + ' | Keszflow' : 'Keszflow'} </title>
          <link rel="icon" href="/img/favicon.ico" type="image/png"/>
          <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </Head>
        <Box sx={{bgcolor: 'background.paper', minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
          <Header/>
          <Box component="main" m={3} sx={{flexGrow: 1}}>
            {props.children}
          </Box>
            <Footer/>
        </Box>
      </>
  )
}

/*Layout.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>{page}</Layout>
    )
}*/
