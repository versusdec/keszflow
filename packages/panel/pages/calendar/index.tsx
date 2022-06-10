import React, { useEffect, useRef, useState } from 'react'
import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import Link from 'next/link'
import { useInvoices } from '../../hooks/useInvoices'
import moment from 'moment'
import dynamic from 'next/dynamic'
import {
  InvoiceCreate,
  useCreateModal,
} from '@keszflow/components/src/components/Invoices/Create'

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
          <Box>
            <Link href={'/'}>
              <Button variant={'contained'}>Dashboard</Button>
            </Link>
          </Box>
        </Grid>
      </Grid>
      <CalendarJSX events={events} onClick={clickHandler} />
      <InvoiceCreate
        open={createModalOpen}
        onClose={handleCreateModal}
        id={createItemId}
      />
    </>
  )
}

export default MyCalendar
