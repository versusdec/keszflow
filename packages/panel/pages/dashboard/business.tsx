import React, { useState } from 'react'
import { Box, Button, Grid, Typography } from '@mui/material'
import { useInvoices } from '@keszflow/panel/hooks'
import {
  InvoiceList,
  InvoiceCreate,
  useCreateModal,
  InvoiceUpload,
  useUploadModal,
  Export,
  useExport,
  InvoiceTypes,
} from '@keszflow/components'
import Link from 'next/link'

const BusinessDashboard = () => {
  const [createItemId, setCreateItemId] = useState(0)
  const [dataType, setDataType] = useState('')
  const { data } = useInvoices()
  const { createModalOpen, handleCreateModal } = useCreateModal()
  const { uploadModalOpen, handleUploadModal } = useUploadModal()
  const { exportModalOpen, handleExportModal } = useExport()

  const openInvoiceHandler = (id: number, type: string) => {
    setCreateItemId(id)
    switch (type) {
      case InvoiceTypes.Created:
        setDataType(InvoiceTypes.Created)
        handleCreateModal()
        break
      case InvoiceTypes.Uploaded:
        setDataType(InvoiceTypes.Uploaded)
        handleUploadModal()
        break
      default:
        break
    }
  }

  return (
    <>
      <Grid container mb={3} justifyContent={'space-between'}>
        <Grid item>
          <Typography variant={'h5'}>My Invoices</Typography>
        </Grid>
        <Grid item>
          <Box>
            <Grid container gap={2}>
              <Link href={'/calendar/'} passHref>
                <Button variant={'contained'}>Calendar</Button>
              </Link>
              <Button
                variant="contained"
                onClick={() => {
                  handleExportModal()
                }}
              >
                export
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  setCreateItemId(0)
                  setDataType(InvoiceTypes.Uploaded)
                  handleUploadModal()
                }}
              >
                upload
              </Button>

              <Button
                variant="contained"
                onClick={() => {
                  setCreateItemId(0)
                  setDataType(InvoiceTypes.Created)
                  handleCreateModal()
                }}
              >
                create
              </Button>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <InvoiceList invoices={data} openInvoiceHandler={openInvoiceHandler} />
      {dataType === InvoiceTypes.Created && (
        <InvoiceCreate
          open={createModalOpen}
          onClose={handleCreateModal}
          id={createItemId}
        />
      )}
      {dataType === InvoiceTypes.Uploaded && (
        <InvoiceUpload
          open={uploadModalOpen}
          onClose={handleUploadModal}
          id={createItemId}
        />
      )}
      <Export open={exportModalOpen} onClose={handleExportModal} />
    </>
  )
}

export default BusinessDashboard
