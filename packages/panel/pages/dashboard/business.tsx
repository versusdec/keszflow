import React, { useEffect, useState } from 'react'
import { Box, Button, Grid, Typography } from '@mui/material'
import { InvoiceList } from '@keszflow/components'
import { useInvoices } from '../../hooks/useInvoices'
import {
  InvoiceCreate,
  useCreateModal,
} from '@keszflow/components/src/components/Invoices/Create'

export const BusinessDashboard = () => {
  const [itemId, setItemId] = useState(0)
  const { data } = useInvoices()
  const { open, handleCreateModal } = useCreateModal()

  const openInvoiceHandler = (id: number) => {
    setItemId(id)
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
              <Button variant="contained" onClick={() => {}}>
                upload
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  setItemId(0)
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
      <InvoiceCreate open={open} onClose={handleCreateModal} id={itemId} />
    </>
  )
}
