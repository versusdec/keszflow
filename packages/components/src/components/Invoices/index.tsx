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

export const Item = ({ data }: { data: any }) => {
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
            onClick={(e) => {
              console.log(e)
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

export const List = ({ invoices }: { invoices: any[] }) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{}} aria-label="simple table">
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
            {(invoices || []).map((invoice) => (
              <Item key={invoice.id} data={invoice} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
