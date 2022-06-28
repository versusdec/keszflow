import {
  Box,
  Stack,
  Button,
  Divider,
  Typography,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material'
import moment from 'moment'
import { DatePicker } from '@mui/x-date-pickers'
import { Formik, Form, FormikHelpers, FormikProps } from 'formik'
import { Input } from '../../elements/input'
import { ActionButton } from '../../elements/actionButton'
import Sortable from '../Sortable'
import { IInvoice, IItemInfo } from './Create'

export const InvoiceForm = ({
  invoice,
  list,
}: {
  invoice: IInvoice | undefined
  list?: boolean
}) => {
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

  const invoiceValues: IInvoice = invoice || {
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
      issue: null,
      end: null,
      due: null,
    },
    payment: 'cash',
    items: [defaultItem],
  }

  // for future implementation
  /* const validationSchema = Yup.object({
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
  }) */

  const itemJSX = ({ index, formikProps }: any) => {
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
              label={'Net price'}
              fast="true"
              name={`items.${index}.netPrice`}
              value={`items.${index}.netPrice`}
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
              label={'Tax rate'}
              fast="true"
              name={`items.${index}.taxRate`}
              value={`items.${index}.taxRate`}
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
              label={'Gross amount'}
              fast="true"
              name={`items.${index}.grossAmount`}
              value={`items.${index}.grossAmount`}
              size={'small'}
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
        // validationSchema={validationSchema}
        // enableReinitialize={true}
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
      >
        {(formikProps: FormikProps<IInvoice>) => (
          <Form>
            <Box sx={{}}>
              <Stack spacing={2} direction={'row'}>
                <Input label={'Number'} required name={'no'} />
              </Stack>
              <Box sx={{ mt: 2, mb: 3 }}>
                <Typography variant={'h6'}>Seller</Typography>
                <Divider />
              </Box>
              <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 2 }}>
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
              <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 2 }}>
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
                    value={formikProps.values.buyer.country}
                    label={'country'}
                    onChange={(e) => {
                      formikProps.setFieldValue('buyer.country', e.target.value)
                    }}
                  >
                    <MenuItem value={'Poland'}>Poland</MenuItem>
                    <MenuItem value={'Ukraine'}>Ukraine</MenuItem>
                  </Select>
                </FormControl>
              </Stack>
              <Divider sx={{ mt: 2, mb: 3 }} />
              <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 2 }}>
                <FormControl>
                  <InputLabel id="payment">Payment method</InputLabel>
                  <Select
                    id={'payment'}
                    name={'payment'}
                    value={formikProps.values.payment}
                    label={'Payment method'}
                    onChange={(e) => {
                      formikProps.setFieldValue('payment', e.target.value)
                    }}
                  >
                    <MenuItem value={'cash'}>Cash</MenuItem>
                    <MenuItem value={'bank'}>Bank</MenuItem>
                  </Select>
                </FormControl>
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
