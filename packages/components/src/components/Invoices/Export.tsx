import { useRef, useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
} from '@mui/material'
import { Close } from '@mui/icons-material'
import { Input } from '../../elements/input'
import { Form, Formik, FormikHelpers, FormikProps } from 'formik'

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
  type: 'pdf' | 'doc' | 'docx' | string
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
            <Form>
              <Box>
                <Input type={'date'} name={'start'} />
              </Box>
              <Box>
                <Input type={'date'} name={'end'} />
              </Box>
              <Box>
                <Input type={'select'} name={'type'} />
              </Box>
            </Form>
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
