import { useRef, useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
  TextField,
  Stack,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from '@mui/material'
import { Close } from '@mui/icons-material'
import { DatePicker } from '@mui/x-date-pickers'
import { Form, Formik, FormikHelpers, FormikProps } from 'formik'
import moment from 'moment'

export const useExport = () => {
  const [exportModalOpen, setExportModalOpen] = useState(false)
  const handleExportModal = () => {
    setExportModalOpen(!exportModalOpen)
  }
  return { exportModalOpen, handleExportModal }
}

export interface IExport {
  open: boolean
  onClose: () => void
  onConfirm?: () => void
}

export interface IExportValues {
  start: string | null
  end: string | null
  type: 'pdf' | 'doc' | 'docx'
}

export const Export = ({ open, onClose, onConfirm }: IExport) => {
  const formRef = useRef<FormikProps<any>>(null)

  const initialValues: IExportValues = {
    start: null,
    end: null,
    type: 'pdf',
  }

  const handleSubmit = () => {
    const form = formRef.current!
    form.handleSubmit()
  }

  return (
    <>
      <Dialog open={open} onClose={onClose}>
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
          Export
        </DialogTitle>
        <DialogContent dividers>
          <Formik
            initialValues={initialValues}
            onSubmit={(
              values: IExportValues,
              formikHelpers: FormikHelpers<IExportValues>
            ) => {
              console.log(values)
              formikHelpers.setSubmitting(false)
            }}
            innerRef={formRef}
          >
            {(formikProps: FormikProps<any>) => (
              <Form>
                <Stack spacing={2}>
                  <Box>
                    <DatePicker
                      label="Start date"
                      inputFormat="DD/MM/yyyy"
                      value={formikProps.values.start}
                      onChange={(val) => {
                        formikProps.setFieldValue(
                          'start',
                          moment(val).toISOString()
                        )
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Box>
                  <Box>
                    <DatePicker
                      label="End date"
                      inputFormat="DD/MM/yyyy"
                      value={formikProps.values.end}
                      onChange={(val) => {
                        formikProps.setFieldValue(
                          'end',
                          moment(val).toISOString()
                        )
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </Box>
                  <Box>
                    <FormControl sx={{ width: '100%' }}>
                      <InputLabel id="type">Type</InputLabel>
                      <Select
                        id={'type'}
                        name={'type'}
                        value={formikProps.values.type}
                        label={'type'}
                        onChange={(e) => {
                          formikProps.setFieldValue('type', e.target.value)
                        }}
                      >
                        <MenuItem value={'pdf'}>PDF</MenuItem>
                        <MenuItem value={'doc'}>DOC</MenuItem>
                        <MenuItem value={'docx'}>DOCX</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Stack>
              </Form>
            )}
          </Formik>
        </DialogContent>
        <DialogActions>
          <Button
            type={'button'}
            variant={'contained'}
            onClick={() => {
              handleSubmit()
            }}
          >
            Export
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
