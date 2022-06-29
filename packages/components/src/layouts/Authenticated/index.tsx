import { ReactElement } from 'react'
import { Head, Footer, Header } from '@keszflow/components'

import { Box } from '@mui/material'
import { InvoiceUpload, useUploadModal } from '../../components/Invoices/Upload'

interface Props {
  children?: ReactElement
  title?: string
}

export default function AuthenticatedLayout(props: Props) {
  const { uploadModalOpen, handleUploadModal } = useUploadModal()

  return (
    <>
      <Head title={props.title} />
      <Box
        onDragEnter={(e) => {
          e.preventDefault()
          e.stopPropagation()
          handleUploadModal()
        }}
      >
        <Box
          sx={{
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
          <InvoiceUpload open={uploadModalOpen} onClose={handleUploadModal} />
          <Footer />
        </Box>
      </Box>
    </>
  )
}
