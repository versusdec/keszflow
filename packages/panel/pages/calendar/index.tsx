import React, { useState } from 'react'
import { Box, Button, Grid, Typography, Stack } from '@mui/material'
import Link from 'next/link'
import { useInvoices } from '../../hooks/useInvoices'
import {
  InvoiceCreate,
  useCreateModal,
} from '@keszflow/components/src/components/Invoices/Create'
import {
  Export,
  useExport,
} from '@keszflow/components/src/components/Invoices/Export'
import { Calendar } from '@keszflow/components'

const MyCalendar = () => {
  const { data } = useInvoices()
  const [createItemId, setCreateItemId] = useState(0)
  const { createModalOpen, handleCreateModal } = useCreateModal()
  const { exportModalOpen, handleExportModal } = useExport()

  const clickHandler = (info: any) => {
    const id = parseInt(info.id)
    if (id) {
      setCreateItemId(id)
      handleCreateModal()
    }
  }

  return (
    <>
      <Grid container mb={3} justifyContent={'space-between'}>
        <Grid item>
          <Typography variant={'h5'}>Calendar</Typography>
        </Grid>
        <Grid item>
          <Stack direction={'row'} spacing={2}>
            <Box>
              <Button
                variant="contained"
                onClick={() => {
                  handleExportModal()
                }}
              >
                export
              </Button>
            </Box>
            <Box>
              <Link href={'/'} passHref>
                <Button variant={'contained'}>Dashboard</Button>
              </Link>
            </Box>
          </Stack>
        </Grid>
      </Grid>
      <Calendar events={data} onClick={clickHandler} />
      <InvoiceCreate
        open={createModalOpen}
        onClose={handleCreateModal}
        id={createItemId}
      />
      <Export open={exportModalOpen} onClose={handleExportModal} />
    </>
  )
}

export default MyCalendar
