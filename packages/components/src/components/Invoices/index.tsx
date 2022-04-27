import React, { MouseEventHandler, useEffect, useState } from 'react'
import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Modal,
  Box,
  Typography,
} from '@mui/material'
import { ActionButton } from '../../elements/actionButton'
import { useInvoice } from '@keszflow/panel/hooks/useInvoice'
import { invoiceData, useInvoices } from '@keszflow/panel/hooks/useInvoices'
import { Invoice } from './Invoice'

export const Item = ({ data, open }: { data: invoiceData; open: any }) => {
  return (
    <>
      <TableRow>
        <TableCell>{data.id}</TableCell>
        <TableCell align="left">{data.name}</TableCell>
        <TableCell align="left">{data.date}</TableCell>
        <TableCell align="left">{data.total}</TableCell>
        <TableCell align="left">{data.status}</TableCell>
        <TableCell align="right">
          <ActionButton
            onClick={() => {
              open(data.id)
            }}
            icon="launch"
            tooltip={'Open'}
          />
          <ActionButton
            onClick={(e) => {
              console.log(e)
            }}
            icon="delete"
            tooltip={'Delete'}
          />
        </TableCell>
      </TableRow>
    </>
  )
}

export const List = ({ invoices }: { invoices: invoiceData[] | undefined }) => {
  const [active, setActive] = useState(0)
  const { invoice } = useInvoice(active)

  const openHandler = (id: number) => {
    setActive(id)
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{}}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices &&
              invoices.map((invoice) => (
                <Item key={invoice.id} data={invoice} open={openHandler} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {!!active && <Invoice id={active} openHandler={openHandler} />}
    </>
  )
}
