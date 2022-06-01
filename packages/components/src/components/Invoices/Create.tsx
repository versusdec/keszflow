import React, { useState } from 'react'
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
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material'
import { Close } from '@mui/icons-material'
import * as Yup from 'yup'
import moment from 'moment'
import { DesktopDatePicker, DatePicker } from '@mui/x-date-pickers'
import {
  Formik,
  Form,
  FormikHelpers,
  FormikProps,
  FieldArray,
  ArrayHelpers,
} from 'formik'

import { Input } from '../../elements/input'
import { ActionButton } from '../../elements/actionButton'
import Sortable from '../Sortable'

interface CreateModalProps {
  open: boolean
  onClose: () => void
}

export const useCreateModal = () => {
  const [open, setOpen] = useState(false)

  const handleCreateModal = () => {
    setOpen(!open)
  }

  return { open, handleCreateModal }
}

interface DatesInfo {
  issue: string | null
  end: string | null
  due: string | null
}

export interface ItemInfo {
  pos: number
  name: string
  unit: string
  quantity: number | ''
  netPrice: number | ''
  taxRate: number | ''
  netAmount: number | ''
  taxAmount: number | ''
  grossAmount: number | ''
}

export interface SellerInfo {
  name: string
  country: 'Poland' | 'Ukraine'
  address_line_1: string
  address_line_2?: string
  address_line_3?: string
}

export interface Invoice {
  no: string
  seller: SellerInfo
  buyer: SellerInfo
  dates: DatesInfo
  items: ItemInfo[]
}

export const InvoiceCreate = ({ open, onClose }: CreateModalProps) => {
  const invoiceValues: Invoice = {
    no: '',
    seller: {
      name: '',
      country: 'Poland',
      address_line_1: '',
      address_line_2: '',
      address_line_3: '',
    },
    buyer: {
      name: '',
      country: 'Poland',
      address_line_1: '',
      address_line_2: '',
      address_line_3: '',
    },
    dates: {
      issue: '2022-05-20T14:27:20.000Z',
      end: null,
      due: null,
    },
    items: [
      {
        pos: 0,
        name: '1',
        unit: 'kg',
        quantity: 10,
        netPrice: 125,
        taxRate: '',
        netAmount: '',
        taxAmount: '',
        grossAmount: '',
      },
      {
        pos: 1,
        name: '2',
        unit: 'pcs',
        quantity: 12,
        netPrice: 1232,
        taxRate: '',
        netAmount: '',
        taxAmount: '',
        grossAmount: '',
      },
      {
        pos: 2,
        name: '3',
        unit: 'hrs',
        quantity: 43,
        netPrice: 23,
        taxRate: '',
        netAmount: '',
        taxAmount: '',
        grossAmount: '',
      },
      {
        pos: 3,
        name: '4',
        unit: 'gr',
        quantity: 123,
        netPrice: 435,
        taxRate: '',
        netAmount: '',
        taxAmount: '',
        grossAmount: '',
      },
      {
        pos: 4,
        name: '5',
        unit: 'ml',
        quantity: 250,
        netPrice: 50,
        taxRate: '',
        netAmount: '',
        taxAmount: '',
        grossAmount: '',
      },
    ],
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

  const itemJSX = ({ item, index, formikProps }: any) => {
    return (
      <Stack direction={'row'} spacing={2} mb={2} key={index}>
        <Box>
          <ActionButton
            onClick={() => {
              // open(data.id)
            }}
            icon="apps"
            tooltip={'Drag'}
          />
        </Box>
        <Box>
          <Input
            label={'Name'}
            fast="true"
            name={`items.${index}.name`}
            value={`items.${index}.name` || ''}
            size={'small'}
          />
        </Box>
        <Box>
          <Input
            label={'Unit'}
            fast="true"
            name={`items.${index}.unit`}
            value={`items.${index}.unit`}
            size={'small'}
          />
        </Box>
        <Box>
          <Input
            label={'Quantity'}
            fast="true"
            name={`items.${index}.quantity`}
            value={`items.${index}.quantity`}
            size={'small'}
          />
        </Box>
        <Box>
          <Input
            label={'Gross amount'}
            fast="true"
            name={`items.${index}.grossAmount`}
            value={`items.${index}.grossAmount`}
            size={'small'}
          />
        </Box>
        <Box>
          <Input
            label={'Net amount'}
            fast="true"
            name={`items.${index}.netAmount`}
            value={`items.${index}.netAmount`}
            size={'small'}
          />
        </Box>
        <Box>
          <Input
            label={'Net price'}
            fast="true"
            name={`items.${index}.netPrice`}
            value={`items.${index}.netPrice`}
            size={'small'}
          />
        </Box>
        <Box>
          <Input
            label={'Tax amount'}
            fast="true"
            name={`items.${index}.taxAmount`}
            value={`items.${index}.taxAmount`}
            size={'small'}
          />
        </Box>
        <Box>
          <Input
            label={'Tax rate'}
            fast="true"
            name={`items.${index}.taxRate`}
            value={`items.${index}.taxRate`}
            size={'small'}
          />
        </Box>

        <Box justifyContent={'flex-end'}>
          <ActionButton
            onClick={() => {
              // arrayHelpers.remove(index);
              // console.log(formikProps.values.items[index])
              formikProps.values.items.splice(index, 1)
              formikProps.setFieldValue('items', formikProps.values.items)
              // formikProps.setValues(formikProps.values)
            }}
            icon="delete"
            tooltip={'Remove'}
          />
        </Box>
      </Stack>
    )
  }
  /*  const handleChange = (items: any[]) => {
    formikProps.setFieldValue('items', items)
  }*/

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
          // enableReinitialize={true}
          onSubmit={(
            values: Invoice,
            formikHelpers: FormikHelpers<Invoice>
          ) => {
            values.items &&
              values.items.map((item, i) => {
                item.pos = i
              })
            console.log(values)

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
                  </Stack>
                  <Box sx={{ mt: 2, mb: 3 }}>
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
                    <FormControl>
                      <InputLabel id="seller.country">Country</InputLabel>
                      <Select
                        id={'seller.country'}
                        name={'seller.country'}
                        value={formikProps.values.seller.country}
                        label={'country'}
                        onChange={(e) => {
                          console.log(e.target.value)
                          formikProps.setFieldValue(
                            'seller.country',
                            e.target.value
                          )
                        }}
                      >
                        <MenuItem value={'Poland'}>Poland</MenuItem>
                        <MenuItem value={'Ukraine'}>Ukraine</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
                  <Box sx={{ mt: 2, mb: 3 }}>
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
                    <FormControl>
                      <InputLabel id="buyer.country">Country</InputLabel>
                      <Select
                        id={'buyer.country'}
                        name={'buyer.country'}
                        value={formikProps.values.seller.country}
                        label={'country'}
                        onChange={(e) => {
                          console.log(e.target.value)
                          formikProps.setFieldValue(
                            'buyer.country',
                            e.target.value
                          )
                        }}
                      >
                        <MenuItem value={'Poland'}>Poland</MenuItem>
                        <MenuItem value={'Ukraine'}>Ukraine</MenuItem>
                      </Select>
                    </FormControl>
                  </Stack>
                  <Divider sx={{ mt: 2, mb: 3 }} />
                  <Stack direction="row" spacing={2}>
                    <DatePicker
                      label="Issue date"
                      // inputFormat="DD.MM.yyyy"
                      value={formikProps.values.dates.issue}
                      onChange={(val) => {
                        formikProps.setFieldValue(
                          'dates.issue',
                          moment(val).toISOString()
                        )
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                    <DatePicker
                      label="End date"
                      // inputFormat="DD.MM.yyyy"
                      value={formikProps.values.dates.end}
                      onChange={(val) => {
                        formikProps.setFieldValue(
                          'dates.end',
                          moment(val).toISOString()
                        )
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                    <DatePicker
                      label="Due date"
                      // inputFormat="DD.MM.yyyy"
                      value={formikProps.values.dates.due}
                      onChange={(val) => {
                        formikProps.setFieldValue(
                          'dates.due',
                          moment(val).toISOString()
                        )
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Stack>
                  <Divider sx={{ mt: 2, mb: 3 }} />
                  <Stack
                    direction="row"
                    justifyContent={'space-between'}
                    spacing={2}
                  >
                    <Typography variant={'h6'}>Items</Typography>
                    <Button
                      type={'button'}
                      variant={'contained'}
                      sx={{}}
                      onClick={() => {
                        formikProps.values.items.push({
                          pos: formikProps.values.items.length,
                          name: '',
                          unit: '',
                          quantity: '',
                          netPrice: '',
                          taxRate: '',
                          netAmount: '',
                          taxAmount: '',
                          grossAmount: '',
                        })
                        formikProps.setValues(formikProps.values)
                        console.log(formikProps.values.items)
                      }}
                    >
                      Add
                    </Button>
                  </Stack>
                  <Divider sx={{ mt: 2, mb: 3 }} />
                  <Sortable
                    items={formikProps.values.items}
                    Component={itemJSX}
                    formikProps={formikProps}
                    onChange={(items: any[]) => {
                      // console.log(items);
                      // formikProps.values.items = items;
                      // formikProps.setValues(formikProps.values)
                      formikProps.setFieldValue('items', items)
                    }}
                  />
                  {/*<FieldArray
                    name={'items'}
                    render={(arrayHelpers: ArrayHelpers) => {*/}
                  {/* }}
                  />*/}
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
