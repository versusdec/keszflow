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
import { InvoiceCreate } from '@keszflow/components/src/components/Invoices/Create'

export const BusinessDashboard = () => {
  return (
    <>
      <Grid container mb={3} justifyContent={'space-between'}>
        <Grid item>
          <Typography variant={'h5'}>My Invoices</Typography>
        </Grid>
        <Grid item>
          <Box>
            <InvoiceCreate />
          </Box>
        </Grid>
      </Grid>
      <InvoiceList />
    </>
  )
}
