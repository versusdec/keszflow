import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { List as Invoices } from '@keszflow/components'
import { useInvoices } from '@keszflow/panel/hooks/useInvoices'
import { useServer } from '@keszflow/panel/hooks/useServer'

export const Home = () => {
  const { data } = useServer()
  console.log(data)
  const { invoices } = useInvoices()

  return (
    <Box p={3}>
      <Typography variant={'h4'} mb={3}>
        Dashboard
      </Typography>
      <Box sx={{}}>
        <Invoices invoices={invoices} />
      </Box>
    </Box>
  )
}
