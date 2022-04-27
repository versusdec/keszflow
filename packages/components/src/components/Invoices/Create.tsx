import React, { useEffect, useRef, useState } from 'react'
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Stack,
  Button,
  Divider,
  DialogActions,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Table,
  TableCell,
  TableBody,
  TableContainer,
  TableRow,
  TableHead,
  Paper,
} from '@mui/material'
import { Close } from '@mui/icons-material'
import * as Yup from 'yup'
import moment from 'moment'
import { DesktopDatePicker, DatePicker } from '@mui/x-date-pickers'

import {
  Formik,
  Form,
  Field,
  FormikHelpers,
  useFormik,
  FormikProps,
} from 'formik'
import { Input } from '../../elements/input'
import { Item } from './index'
import { ActionButton } from '../../elements/actionButton'

interface CreateModalProps {
  open: boolean
  // onSave: () => void
  onClose: () => void
}

export const useCreateModal = () => {
  const [open, setOpen] = useState(false)

  const handleCreateModal = () => {
    setOpen(!open)
  }

  return { open, handleCreateModal }
}

export const InvoiceCreate = ({ open, onClose }: CreateModalProps) => {
  interface DatesInfo {
    issue: string | null
    end: string | null
    due: string | null
  }

  interface ItemInfo {
    pos: number
    name: string
    unit: string
    quantity: number | null
    netPrice: number | null
    taxRate: number | null
    netAmount: number | null
    taxAmount: number | null
    grossAmount: number | null
  }

  interface SellerInfo {
    name: string
    address_line_1: string
    address_line_2?: string
    address_line_3?: string
  }

  interface Invoice {
    no: string
    country: 'Poland' | 'Ukraine'
    seller: SellerInfo
    buyer: SellerInfo
    dates: DatesInfo
    items: ItemInfo[]
  }

  const validationSchema = Yup.object({
    dates: Yup.object({
      issue: Yup.date().nullable(),
    }),
    client: Yup.string().required('This field is required'),
    seller: Yup.string().required('This field is required'),
    create_date: Yup.string().required('This field is required'),
    payment_date: Yup.string().required('This field is required'),
    payment_type: Yup.string()
      .oneOf(['bank', 'cash'])
      .required('This field is required'),
    items: Yup.array().of(
      Yup.object({
        name: Yup.string().required('This field is required'),
        amount: Yup.number().required('This field is required'),
        price: Yup.number().required('This field is required'),
        netto: Yup.number().required('This field is required'),
        vat: Yup.number().required('This field is required'),
        quota: Yup.number().required('This field is required'),
        brutto: Yup.number().required('This field is required'),
      })
    ),
  })

  const invoiceValues: Invoice = {
    no: '',
    country: 'Poland',
    seller: {
      name: '',
      address_line_1: '',
      address_line_2: '',
      address_line_3: '',
    },
    buyer: {
      name: '',
      address_line_1: '',
      address_line_2: '',
      address_line_3: '',
    },
    dates: {
      issue: null,
      // issue: new Date(),
      end: null,
      // end: new Date(),
      due: null,
      // due: new Date()
    },
    items: [
      {
        pos: 1,
        name: '',
        unit: '',
        quantity: null,
        netPrice: null,
        taxRate: null,
        netAmount: null,
        taxAmount: null,
        grossAmount: null,
      },
    ],
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth={true}
        scroll={'paper'}
        maxWidth={'lg'}
      >
        <Formik
          initialValues={invoiceValues}
          // validationSchema={validationSchema}
          onSubmit={(
            values: Invoice,
            formikHelpers: FormikHelpers<Invoice>
          ) => {
            alert(JSON.stringify(values, null, 2))
            formikHelpers.setSubmitting(false)
          }}
        >
          {(formikProps: FormikProps<Invoice>) => (
            <Form>
              <DialogTitle sx={{ pr: 10 }}>
                <IconButton
                  aria-label="close"
                  onClick={onClose}
                  sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.primary.main,
                  }}
                >
                  <Close />
                </IconButton>
                Create Invoice
              </DialogTitle>
              <DialogContent dividers>
                <Box sx={{}}>
                  <Stack spacing={2} direction={'row'}>
                    <Input label={'Number'} required name={'no'} />
                    <FormControl>
                      <InputLabel id="country">Country</InputLabel>
                      <Select
                        id={'country'}
                        name={'country'}
                        value={formikProps.values.country}
                        label={'country'}
                        onChange={(e) => {
                          console.log(e.target.value)
                          formikProps.setFieldValue('country', e.target.value)
                        }}
                      >
                        <MenuItem value={'Poland'}>Poland</MenuItem>
                        <MenuItem value={'Ukraine'}>Ukraine</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
                  <Box
                    sx={{
                      mt: 2,
                      mb: 3,
                    }}
                  >
                    <Typography variant={'h6'}>Seller</Typography>
                    <Divider />
                  </Box>
                  <Stack direction="row" spacing={2}>
                    <Input label={'Name'} required name={'seller.name'} />
                    <Input
                      label={'Address 1'}
                      required
                      name={'seller.address_line_1'}
                    />
                    <Input label={'Address 2'} name={'seller.address_line_2'} />
                    <Input label={'Address 3'} name={'seller.address_line_3'} />
                  </Stack>
                  <Box
                    sx={{
                      mt: 2,
                      mb: 3,
                    }}
                  >
                    <Typography variant={'h6'}>Buyer</Typography>
                    <Divider />
                  </Box>
                  <Stack direction="row" spacing={2}>
                    <Input label={'Name'} required name={'buyer.name'} />
                    <Input
                      label={'Address 1'}
                      required
                      name={'buyer.address_line_1'}
                    />
                    <Input label={'Address 2'} name={'buyer.address_line_2'} />
                    <Input label={'Address 3'} name={'buyer.address_line_3'} />
                  </Stack>
                  <Divider
                    sx={{
                      mt: 2,
                      mb: 3,
                    }}
                  />
                  <Stack direction="row" spacing={2}>
                    <DatePicker
                      label="Issue date"
                      // inputFormat="DD.MM.yyyy"
                      value={formikProps.values.dates.issue}
                      onChange={(val) => {
                        formikProps.setFieldValue('dates.issue', val)
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                    <DatePicker
                      label="End date"
                      // inputFormat="DD.MM.yyyy"
                      value={formikProps.values.dates.end}
                      onChange={(val) => {
                        formikProps.setFieldValue('dates.end', val)
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                    <DatePicker
                      label="Due date"
                      // inputFormat="DD.MM.yyyy"
                      value={formikProps.values.dates.due}
                      onChange={(val) => {
                        formikProps.setFieldValue('dates.due', val)
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>

                  <Divider
                    sx={{
                      mt: 2,
                      mb: 3,
                    }}
                  />
                  <TableContainer component={Paper}>
                    <Table sx={{}}>
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>Unit</TableCell>
                          <TableCell>Quantity</TableCell>
                          <TableCell>Gross Amount</TableCell>
                          <TableCell>Net Amount</TableCell>
                          <TableCell>Net Price</TableCell>
                          <TableCell>Tax Amount</TableCell>
                          <TableCell>Tax Rate</TableCell>
                          <TableCell />
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {formikProps.values.items.map((item) => {
                          console.log(item)
                          return (
                            <TableRow>
                              <TableCell>
                                <Input
                                  name={'item.name'}
                                  value={item.name}
                                  size={'small'}
                                />
                              </TableCell>

                              <TableCell align="right">
                                <ActionButton
                                  onClick={() => {
                                    // open(data.id)
                                  }}
                                  icon="delete"
                                  tooltip={'Remove'}
                                />
                              </TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button type={'submit'} variant={'contained'} sx={{}}>
                  Save
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </>
  )
}
