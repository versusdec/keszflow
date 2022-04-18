import React from 'react'
import { Box, Button } from '@mui/material'
import { InvoiceList } from '@keszflow/components'
import { useInvoices } from '../../hooks/useInvoices'

export const BusinessDashboard = () => {
  const { invoices } = useInvoices()

  return (
    <>
      <Box>
        <Button variant="contained">Upload</Button>
      </Box>
      <InvoiceList invoices={invoices} />
    </>
  )
}
