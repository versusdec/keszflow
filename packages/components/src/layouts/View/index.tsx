import { ReactElement } from 'react'
import { Footer, Header } from '@keszflow/components'
import Head from 'next/head'
import { Box, Drawer } from '@mui/material'
import { InvoiceUpload, useUploadModal } from '../../components/Invoices/Upload'
import { KeszflowBusinessLogo } from '../../components/KeszflowBusinessLogo'
import { useRouter } from 'next/router'

interface Props {
  children?: ReactElement
  title?: string
}

export default function Layout(props: Props) {
  const router = useRouter()
  const { uploadModalOpen, handleUploadModal } = useUploadModal()
  const auth = router.pathname === '/sign-in' || router.pathname === '/sign-up'
  const head = (
    <Head>
      <title>{props.title ? props.title + ' | Keszflow' : 'Keszflow'} </title>
      <link rel="icon" href="/img/keszflow_logo.png" type="image/png" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
    </Head>
  )

  const defaultLayout = (
    <>
      <Box
        onDragEnter={(e) => {
          e.preventDefault()
          e.stopPropagation()
          handleUploadModal()
        }}
      >
        {head}
        <Box
          sx={{
            bgcolor: 'background.paper',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Header />
          <Box
            component="main"
            m={3}
            sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
          >
            {props.children}
          </Box>
          <Footer />
        </Box>
      </Box>
      <InvoiceUpload open={uploadModalOpen} onClose={handleUploadModal} />
    </>
  )

  const drawerWidth = 500

  const authLayout = (
    <>
      {head}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          display: 'flex',
          flexGrow: 1,
          bgcolor: 'action.focus',
        }}
      >
        <Drawer
          variant="permanent"
          anchor="left"
          sx={{
            maxWidth: drawerWidth,
            width: '100%',
            '& .MuiDrawer-paper': {
              maxWidth: drawerWidth,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              p: 3,
            },
          }}
        >
          {props.children}
        </Drawer>
        <Box
          sx={{
            width: '66%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <KeszflowBusinessLogo width={365} />
        </Box>
      </Box>
    </>
  )

  return <>{auth ? authLayout : defaultLayout}</>
}
