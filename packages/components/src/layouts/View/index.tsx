import React, { ReactElement } from 'react'
import { Footer, Header } from '@keszflow/components'
import { Sidebar } from '@keszflow/components'
import Head from 'next/head'
import { Grid, Box, Container } from '@mui/material'
import { InvoiceUpload, useUploadModal } from '../../components/Invoices/Upload'

interface Props {
  children?: ReactElement
  title?: string
}

export default function Layout(props: Props) {
  const { uploadModalOpen, handleUploadModal } = useUploadModal()

  return (
    <>
      <Box
        onDragEnter={(e) => {
          e.preventDefault()
          e.stopPropagation()
          handleUploadModal()
        }}
      >
        <Head>
          <title>
            {props.title ? props.title + ' | Keszflow' : 'Keszflow'}{' '}
          </title>
          <link rel="icon" href="/img/favicon.ico" type="image/png" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </Head>
        <Box
          sx={{
            bgcolor: 'background.paper',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Header />
          <Box component="main" m={3} sx={{ flexGrow: 1 }}>
            {props.children}
          </Box>
          <Footer />
        </Box>
      </Box>
      <InvoiceUpload open={uploadModalOpen} onClose={handleUploadModal} />
    </>
  )
}

/*Layout.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>{page}</Layout>
    )
}*/
