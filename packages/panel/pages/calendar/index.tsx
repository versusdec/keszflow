import React, { useState } from 'react'
import { Box, Button, Grid, Typography, Stack } from '@mui/material'
import Link from 'next/link'
import { useInvoices } from '../../hooks/useInvoices'
import moment from 'moment'
import dynamic from 'next/dynamic'
import {
  InvoiceCreate,
  useCreateModal,
} from '@keszflow/components/src/components/Invoices/Create'
import {
  Export,
  useExport,
} from '@keszflow/components/src/components/Invoices/Export'

const CalendarJSX = dynamic(
  () => import('@keszflow/components/src/components/Calendar'),
  {
    ssr: false,
  }
)

const MyCalendar = () => {
  const { data } = useInvoices()
  const [createItemId, setCreateItemId] = useState(0)
  const { createModalOpen, handleCreateModal } = useCreateModal()
  const { exportModalOpen, handleExportModal } = useExport()

  const events =
    data &&
    data.map((item) => {
      return {
        id: item.id,
        title: item.name,
        start: moment(item.date).toISOString(),
      }
    })

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
      <CalendarJSX events={events} onClick={clickHandler} />
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
