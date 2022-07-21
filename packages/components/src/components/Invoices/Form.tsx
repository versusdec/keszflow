import {
  Box,
  Stack,
  Button,
  Divider,
  Typography,
  TextField,
  InputAdornment,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { Formik, Form, FormikHelpers, FormikProps } from 'formik'
import { Input } from '../../elements/input'
import { ActionButton } from '../../elements/actionButton'
import Sortable from '../Sortable'
import { IInvoice, IItemInfo } from './Create'
import { useUser } from '@keszflow/panel/hooks/useUser'
import { ForwardedRef, forwardRef, useRef, useState } from 'react'
import * as Yup from 'yup'

export const useForm = () => {
  const formRef = useRef<FormikProps<any>>(null)
  const handleSubmit = () => {
    const form = formRef.current!
    form.handleSubmit()
  }

  return { formRef, handleSubmit }
}

export const InvoiceForm = forwardRef(
  (
    {
      invoice,
      list,
      type,
    }: {
      invoice: IInvoice | undefined
      list?: boolean
      type?: 'upload' | 'create'
    },
    ref: ForwardedRef<any>
  ) => {
    interface IAdornment {
      [x: string]: boolean | object
    }

    const { user } = useUser()
    // temp hardcode
    let role = user?.role
    role = 'accountant'

    const defaultItem: IItemInfo = {
      pos: 0,
      name: '',
      unit: '',
      quantity: '',
      netPrice: '',
      taxRate: '',
      netAmount: '',
      taxAmount: '',
      grossAmount: '',
    }

    const [adornmentValues, setAdornmentValues] = useState<IAdornment>({})

    const invoiceValues: IInvoice = invoice || {
      no: '',
      file: '',
      seller: {
        name: '',
        country: 'poland',
        address_line_1: '',
        address_line_2: '',
        address_line_3: '',
      },
      buyer: {
        name: '',
        country: 'poland',
        address_line_1: '',
        address_line_2: '',
        address_line_3: '',
      },
      dates: {
        issue: null,
        end: null,
        due: null,
      },
      payment: 'cash',
      items: [defaultItem],
    }

    const validationSchema = Yup.object({
      no: Yup.string().required('This field is required'),
      dates: Yup.object({
        issue: Yup.date().nullable(),
        end: Yup.date().nullable(),
        due: Yup.date().nullable(),
      }),
      buyer: Yup.object({
        name: Yup.string().required('This field is required'),
        address_line_1: Yup.string().required('This field is required'),
        address_line_2: Yup.string(),
        address_line_3: Yup.string(),
        country: Yup.string().oneOf(['poland', 'ukraine']),
      }),
      seller: Yup.object({
        name: Yup.string().required('This field is required'),
        address_line_1: Yup.string().required('This field is required'),
        address_line_2: Yup.string(),
        address_line_3: Yup.string(),
        country: Yup.string().oneOf(['poland', 'ukraine']),
      }),
      payment_type: Yup.string().oneOf(['bank', 'cash']),
      items: Yup.array().of(
        Yup.object({
          name: Yup.string(),
          unit: Yup.string(),
          quantity: Yup.number(),
          net_price: Yup.number(),
          net_amount: Yup.number(),
          tax_rate: Yup.number(),
          tax_amount: Yup.number(),
          gross_amount: Yup.number(),
        })
      ),
    })

    const Adornment = (name: string) => {
      const isCorrect = adornmentValues[name]

      return {
        endAdornment: role === 'accountant' && type === 'upload' && (
          <InputAdornment position="end">
            <ActionButton
              tooltip={'Correct'}
              color={isCorrect ? 'success' : 'error'}
              onClick={() => {
                setAdornmentValues((prev) => {
                  return {
                    ...prev,
                    [name]: !prev[name],
                  }
                })
              }}
              icon={'check'}
            />
          </InputAdornment>
        ),
      }
    }

    const itemJSX = ({
      index,
      formikProps,
    }: {
      index: number
      formikProps: FormikProps<IInvoice>
    }) => {
      return (
        <>
          <Stack
            direction={'row'}
            sx={{ flexWrap: list ? 'wrap' : 'nowrap', gap: 2 }}
            mt={2}
            mb={2}
            key={index}
          >
            <Box
              sx={{
                width: list ? '100%' : 'auto',
                flexShrink: 0,
              }}
            >
              <ActionButton onClick={() => {}} icon="apps" tooltip={'Drag'} />
            </Box>
            <Box>
              <Input
                draggable={false}
                label={'Name'}
                fast="true"
                name={`items.${index}.name`}
                value={`items.${index}.name` || ''}
                size={'small'}
                InputProps={Adornment(`items.${index}.name`)}
              />
            </Box>
            <Box>
              <Input
                label={'Unit'}
                fast="true"
                name={`items.${index}.unit`}
                value={`items.${index}.unit`}
                size={'small'}
                InputProps={Adornment(`items.${index}.unit`)}
              />
            </Box>
            <Box>
              <Input
                label={'Quantity'}
                fast="true"
                name={`items.${index}.quantity`}
                value={`items.${index}.quantity`}
                size={'small'}
                InputProps={Adornment(`items.${index}.quantity`)}
              />
            </Box>

            <Box>
              <Input
                label={'Net price'}
                fast="true"
                name={`items.${index}.netPrice`}
                value={`items.${index}.netPrice`}
                size={'small'}
                InputProps={Adornment(`items.${index}.netPrice`)}
              />
            </Box>
            <Box>
              <Input
                label={'Net amount'}
                fast="true"
                name={`items.${index}.netAmount`}
                value={`items.${index}.netAmount`}
                size={'small'}
                InputProps={Adornment(`items.${index}.netAmount`)}
              />
            </Box>
            <Box>
              <Input
                label={'Tax rate'}
                fast="true"
                name={`items.${index}.taxRate`}
                value={`items.${index}.taxRate`}
                size={'small'}
                InputProps={Adornment(`items.${index}.taxRate`)}
              />
            </Box>
            <Box>
              <Input
                label={'Tax amount'}
                fast="true"
                name={`items.${index}.taxAmount`}
                value={`items.${index}.taxAmount`}
                size={'small'}
                InputProps={Adornment(`items.${index}.taxAmount`)}
              />
            </Box>
            <Box>
              <Input
                label={'Gross amount'}
                fast="true"
                name={`items.${index}.grossAmount`}
                value={`items.${index}.grossAmount`}
                size={'small'}
                InputProps={Adornment(`items.${index}.grossAmount`)}
              />
            </Box>
            <Box justifyContent={'flex-end'}>
              <ActionButton
                onClick={() => {
                  const newItems = [...formikProps.values.items]
                  newItems.splice(index, 1)
                  formikProps.setFieldValue('items', newItems)
                }}
                disabled={formikProps.values.items.length === 1}
                icon="delete"
                tooltip={'Remove'}
              />
            </Box>
          </Stack>
          <Divider />
        </>
      )
    }

  return (
    <>
      <Formik
        initialValues={invoiceValues}
        validationSchema={validationSchema}
        onSubmit={(
          values: IInvoice,
          formikHelpers: FormikHelpers<IInvoice>
        ) => {
          values.items &&
            values.items.forEach((item, i) => {
              item.pos = i
            })
          console.log(values)
          formikHelpers.setSubmitting(false)
        }}
        innerRef={ref}
      >
        {(formikProps: FormikProps<IInvoice>) => (
          <Form>
            <Box sx={{}}>
              <Stack spacing={2} direction={'row'}>
                <Input
                  label={'Number'}
                  name={'no'}
                  required
                  InputProps={Adornment('no')}
                />
              </Stack>
              <Box sx={{ mt: 2, mb: 3 }}>
                <Typography variant={'h6'}>Seller</Typography>
                <Divider />
              </Box>
              <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 2 }}>
                <Input
                  label={'Name'}
                  required
                  name={'seller.name'}
                  InputProps={Adornment('seller.name')}
                />
                <Input
                  label={'Address 1'}
                  required
                  name={'seller.address_line_1'}
                  InputProps={Adornment('seller.address_line_1')}
                />
                <Input
                  label={'Address 2'}
                  name={'seller.address_line_2'}
                  InputProps={Adornment('seller.address_line_2')}
                />
                <Input
                  label={'Address 3'}
                  name={'seller.address_line_3'}
                  InputProps={Adornment('seller.address_line_3')}
                />
                <Input
                  select
                  options={[
                    {
                      label: 'Poland',
                      value: 'poland',
                    },
                    {
                      label: 'Ukraine',
                      value: 'ukraine',
                    },
                  ]}
                  label={'Country'}
                  name={'seller.country'}
                  value={formikProps.values.seller.country}
                  adornment={Adornment('seller.country')}
                />
              </Stack>
              <Box sx={{ mt: 2, mb: 3 }}>
                <Typography variant={'h6'}>Buyer</Typography>
                <Divider />
              </Box>
              <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 2 }}>
                <Input
                  label={'Name'}
                  required
                  name={'buyer.name'}
                  InputProps={Adornment('buyer.name')}
                />
                <Input
                  label={'Address 1'}
                  required
                  name={'buyer.address_line_1'}
                  InputProps={Adornment('buyer.address_line_1')}
                />
                <Input
                  label={'Address 2'}
                  name={'buyer.address_line_2'}
                  InputProps={Adornment('buyer.address_line_2')}
                />
                <Input
                  label={'Address 3'}
                  name={'buyer.address_line_3'}
                  InputProps={Adornment('buyer.address_line_3')}
                />
                <Input
                  select
                  options={[
                    {
                      label: 'Poland',
                      value: 'poland',
                    },
                    {
                      label: 'Ukraine',
                      value: 'ukraine',
                    },
                  ]}
                  label={'Country'}
                  value={formikProps.values.buyer.country}
                  name={'buyer.country'}
                  adornment={Adornment('buyer.country')}
                />
              </Stack>
              <Divider sx={{ mt: 2, mb: 3 }} />
              <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 2 }}>
                <Input
                  select
                  options={[
                    {
                      label: 'Cash',
                      value: 'cash',
                    },
                    {
                      label: 'Bank',
                      value: 'bank',
                    },
                  ]}
                  label={'Payment'}
                  value={formikProps.values.payment}
                  name={'payment'}
                  adornment={Adornment('payment')}
                />
                <DatePicker
                  label="Issue date"
                  value={formikProps.values.dates.issue}
                  onChange={(val) => {
                    const date = val && new Date(val).toISOString()
                    formikProps.setFieldValue('dates.issue', date)
                  }}
                  renderInput={(params) => (<TextField {...params} className={'dates_issue'} />)}
                  InputAdornmentProps={{ position: 'start' }}
                  InputProps={Adornment('dates.issue')}
                />
                <DatePicker
                  label="End date"
                  value={formikProps.values.dates.end}
                  onChange={(val) => {
                    const date = val && new Date(val).toISOString()
                    formikProps.setFieldValue('dates.end', date)
                  }}
                  renderInput={(params) => (<TextField {...params} className={'dates_end'} />)}
                  InputAdornmentProps={{ position: 'start' }}
                  InputProps={Adornment('dates.end')}
                />
                <DatePicker
                  label="Due date"
                  value={formikProps.values.dates.due}
                  onChange={(val) => {
                    const date = val && new Date(val).toISOString()
                    formikProps.setFieldValue('dates.due', date)
                  }}
                  renderInput={(params) => (<TextField {...params} className={'dates_due'} />)}
                  InputAdornmentProps={{ position: 'start' }}
                  InputProps={Adornment('dates.due')}
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
                    const newItems = [...formikProps.values.items]
                    newItems.push({
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
                    formikProps.setFieldValue('items', newItems)
                  }}
                >
                  Add
                </Button>
              </Stack>
              <Divider sx={{ mt: 2, mb: 3 }} />

                <Sortable
                  deps={adornmentValues}
                  items={formikProps.values.items}
                  Component={itemJSX}
                  formikProps={formikProps}
                  onChange={(items: any[]) => {
                    formikProps.setFieldValue('items', items)
                  }}
                />
              </Box>
            </Form>
          )}
        </Formik>
      </>
    )
  }
)
InvoiceForm.displayName = 'Invoice Form'
