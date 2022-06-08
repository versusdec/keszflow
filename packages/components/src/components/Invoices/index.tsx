import React from 'react'
import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material'
import { ActionButton } from '../../elements/actionButton'
import { invoiceData, useInvoices } from '@keszflow/panel/hooks/useInvoices'

export interface IList {
  invoices: invoiceData[] | undefined
  openInvoiceHandler: (id: number) => void
}

export const Item = ({
  data,
  open,
}: {
  data: invoiceData
  open: (id: number) => void
}) => {
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
            onClick={() => {}}
            icon="download"
            tooltip={'Download'}
          />

          <ActionButton onClick={(e) => {}} icon="delete" tooltip={'Delete'} />
        </TableCell>
      </TableRow>
    </>
  )
}

export const List = ({ invoices, openInvoiceHandler }: IList) => {
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
                <Item
                  key={invoice.id}
                  data={invoice}
                  open={openInvoiceHandler}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
