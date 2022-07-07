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
import { invoiceData } from '@keszflow/panel/hooks/useInvoices'
import { format } from 'date-fns'

export interface IList {
  invoices: invoiceData[] | undefined
  openInvoiceHandler: (id: number, type: string) => void
}

export const Item = ({
  data,
  open,
}: {
  data: invoiceData
  open: (id: number, type: string) => void
}) => {
  return (
    <>
      <TableRow data-testid={`list_item_${data.id}`}>
        <TableCell>{data.id}</TableCell>
        <TableCell align="left">{data.name}</TableCell>
        <TableCell align="left">
          {format(new Date(data.date), 'dd.MM.yyyy')}
        </TableCell>
        <TableCell align="left">{data.total}</TableCell>
        <TableCell align="left">{data.status}</TableCell>
        <TableCell align="right">
          <ActionButton
            data-testid={`open_${data.id}`}
            onClick={() => {
              open(data.id, data.type)
            }}
            icon="launch"
            tooltip={'Open'}
          />
          <ActionButton
            data-testid={`download_${data.id}`}
            onClick={() => {}}
            icon="download"
            tooltip={'Download'}
          />
          <ActionButton
            data-testid={`delete_${data.id}`}
            onClick={(e) => {}}
            icon="delete"
            tooltip={'Delete'}
          />
        </TableCell>
      </TableRow>
    </>
  )
}

export const List = ({ invoices, openInvoiceHandler }: IList) => {
  return (
    <>
      <TableContainer component={Paper} data-testid={'list_container'}>
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
