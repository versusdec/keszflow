import React, { useCallback, useEffect, useState } from 'react'
import {
  Box,
  Button,
  Grid,
  Typography,
  Stack,
  DialogTitle,
  IconButton,
  DialogContent,
  DialogActions,
  Dialog,
  Divider,
} from '@mui/material'
import Link from 'next/link'
import { useInvoices } from '../../hooks/useInvoices'
import {
  Export,
  useExport,
} from '@keszflow/components/src/components/Invoices/Export'
import { Calendar } from '@keszflow/components'
import { Close } from '@mui/icons-material'
import { IInvoice } from '@keszflow/components/src/components/Invoices/Create'
import { useInvoice } from '../../hooks/useInvoice'
import { format } from 'date-fns'
import { Loader } from '@keszflow/components/src/components/Loader'

const MyCalendar = () => {
  const { data } = useInvoices()
  const [id, setId] = useState(0)
  const [item, setItem] = useState<IInvoice | undefined>(undefined)
  const { exportModalOpen, handleExportModal } = useExport()

  const clickHandler = (info: any) => {
    setId(info.id)
  }

  const invoiceData = useInvoice(id)
  const invoice = invoiceData.data

  const setInvoice = useCallback(() => {
    setItem(invoice)
  }, [invoice])

  useEffect(() => {
    setInvoice()
  }, [id, setInvoice])

  const loading = invoiceData.isFetching && <Loader />

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
      {loading}
      {item && (
        <Dialog
          open={!!id}
          onClose={() => {
            setId(0)
          }}
          scroll={'paper'}
          fullWidth
          maxWidth={'sm'}
        >
          <DialogTitle sx={{ pr: 10 }}>
            <IconButton
              aria-label="close"
              onClick={() => {
                setId(0)
              }}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: 'primary.main',
              }}
            >
              <Close />
            </IconButton>
            Invoice Details
          </DialogTitle>
          <DialogContent dividers>
            <Typography variant={'h6'}># {item.no}</Typography>
            <Divider sx={{ mt: 2, mb: 2 }} />
            <Stack
              direction={'row'}
              sx={{ gap: 3 }}
              justifyContent={'space-between'}
            >
              <Box>
                <b>Seller</b>
                <br />
                {item.seller.name} <br />
                {item.seller.address_line_1} <br />
                {item.seller.address_line_2} <br />
                {item.seller.address_line_3} <br />
                <Box sx={{ textTransform: 'capitalize' }}>
                  {item.seller.country}
                </Box>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <b>Buyer</b>
                <br />
                {item.buyer.name} <br />
                {item.buyer.address_line_1} <br />
                {item.buyer.address_line_2} <br />
                {item.buyer.address_line_3} <br />
                <Box sx={{ textTransform: 'capitalize' }}>
                  {item.buyer.country}
                </Box>
              </Box>
            </Stack>
            <Divider sx={{ mt: 2, mb: 2 }} />
            <Stack
              direction={'row'}
              sx={{ gap: 3 }}
              justifyContent={'space-between'}
            >
              <Box>
                <b>Due date:</b>
                <br />
                {format(new Date(item.dates.due as string), 'dd.MM.yyyy')}
              </Box>
              <Box>
                <b>End date:</b>
                <br />{' '}
                {format(new Date(item.dates.end as string), 'dd.MM.yyyy')}
              </Box>
              <Box>
                <b>Issue date:</b>
                <br />
                {format(new Date(item.dates.issue as string), 'dd.MM.yyyy')}
              </Box>
            </Stack>
            <Divider sx={{ mt: 2, mb: 2 }} />
            <Box sx={{ textAlign: 'right' }}>
              <b>Total:</b>
              <br />
              <Typography variant={'h6'}>
                {
                  // item.totals.total
                }{' '}
                10000 $
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              type={'button'}
              variant={'contained'}
              onClick={() => {
                setId(0)
              }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <Export open={exportModalOpen} onClose={handleExportModal} />
    </>
  )
}

export default MyCalendar
