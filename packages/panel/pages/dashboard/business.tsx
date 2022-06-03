import React, { useEffect, useState } from 'react'
import { Box, Button, Grid, Typography } from '@mui/material'
import { InvoiceList } from '@keszflow/components'
import { useInvoices } from '../../hooks/useInvoices'
import {
  InvoiceCreate,
  useCreateModal,
} from '@keszflow/components/src/components/Invoices/Create'
import {
  InvoiceUpload,
  useUploadModal,
} from '@keszflow/components/src/components/Invoices/Upload'

export const BusinessDashboard = () => {
  const [createItemId, setCreateItemId] = useState(0)
  const { data } = useInvoices()
  const { createModalOpen, handleCreateModal } = useCreateModal()
  const { uploadModalOpen, handleUploadModal } = useUploadModal()

  const openInvoiceHandler = (id: number) => {
    setCreateItemId(id)
    handleCreateModal()
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
              <Button
                variant="contained"
                onClick={() => {
                  // setItemId(0)
                  handleUploadModal()
                }}
              >
                upload
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  setCreateItemId(0)
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
      <InvoiceCreate
        open={createModalOpen}
        onClose={handleCreateModal}
        id={createItemId}
      />
      <InvoiceUpload open={uploadModalOpen} onClose={handleUploadModal} />
    </>
  )
}
