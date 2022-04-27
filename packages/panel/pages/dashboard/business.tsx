import React, { useState } from 'react'
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogTitle,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material'
import { InvoiceList } from '@keszflow/components'
import { useInvoices } from '../../hooks/useInvoices'
import {
  InvoiceCreate,
  useCreateModal,
} from '@keszflow/components/src/components/Invoices/Create'

export const BusinessDashboard = () => {
  const { data } = useInvoices()
  const { open, handleCreateModal } = useCreateModal()

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
              <Button variant="contained" onClick={handleCreateModal}>
                create
              </Button>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <InvoiceList invoices={data} />
      <InvoiceCreate open={open} onClose={handleCreateModal} />
    </>
  )
}
