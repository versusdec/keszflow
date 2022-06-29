import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
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
  Paper,
  Snackbar,
  Alert,
} from '@mui/material'
import { Close } from '@mui/icons-material'
import { Document, Page } from 'react-pdf'
// import { printPlugin, RenderPrintProps } from '@react-pdf-viewer/print';
import { InvoiceForm } from './Form'
import { useInvoice } from '@keszflow/panel/hooks/useInvoice'
import { Loader } from '../Loader'

interface UploadModalProps {
  open: boolean
  onClose: () => void
  item?: any
  id?: number
}

export const useUploadModal = () => {
  const [uploadModalOpen, setUploadModalOpen] = useState(false)

  const handleUploadModal = () => {
    setUploadModalOpen(!uploadModalOpen)
  }

  return { uploadModalOpen, handleUploadModal }
}

export const useFile = () => {
  const [files, setFiles] = useState([])

  return { files, setFiles }
}

export const InvoiceUpload = ({ open, onClose, id }: UploadModalProps) => {
  const [rejected, setRejected] = useState(false)
  const [pages, setPages] = useState(false)
  const { files, setFiles } = useFile()

  const res = useInvoice(id)

  const item = res.data
  const isFetching = res.isFetching

  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    if (acceptedFiles.length) setFiles(acceptedFiles)
  }, [])

  function onDocumentLoadSuccess({ numPages }: any) {
    setPages(numPages)
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected: () => {
      setRejected(true)
    },
    accept: {
      'application/pdf': ['.pdf'],
    },
    multiple: false,
  })

  const DropzoneJSX = !files.length && !item && (
    <Box {...getRootProps()} sx={{ height: '100%' }}>
      <Paper
        sx={{
          p: 3,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: () => (isDragActive ? 'action.hover' : ''),
          cursor: 'pointer',
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <Typography variant={'h4'}>Drop the files here ...</Typography>
        ) : (
          <>
            <Typography variant={'h4'}>
              Drag 'n' drop some files here, or click to select files
            </Typography>
            <Typography variant={'h5'}>
              (Only *.pdf will be accepted)
            </Typography>
          </>
        )}
      </Paper>
    </Box>
  )

  const PreviewJSX = (!!files.length || item) && (
    <>
      <Stack
        direction={'row'}
        spacing={2}
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Box>
          <Document
            file={files[0] || item?.file}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            {Array.from(new Array(pages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        </Box>
        <Box>
          <InvoiceForm invoice={item} list={true} />
        </Box>
      </Stack>
    </>
  )

  const ModalJSX = (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth={true}
        scroll={'paper'}
        maxWidth={'lg'}
        PaperProps={{
          sx: {
            height: '100%',
          },
        }}
      >
        <DialogTitle sx={{ pr: 10 }}>
          <IconButton
            aria-label="close"
            onClick={() => {
              setFiles([])
              onClose()
            }}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.primary.main,
            }}
          >
            <Close />
          </IconButton>
          Upload Invoice
        </DialogTitle>
        <DialogContent dividers>
          {DropzoneJSX}

          {PreviewJSX}

          {rejected && (
            <Snackbar
              open={rejected}
              onClose={() => {
                setRejected(false)
              }}
              autoHideDuration={3000}
            >
              <Alert severity="warning">This file type is not supported!</Alert>
            </Snackbar>
          )}
        </DialogContent>
        <DialogActions>
          <Button type={'button'} variant={'contained'} onClick={() => {}}>
            Print
          </Button>
          <Button type={'submit'} variant={'contained'} sx={{}}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
  return isFetching ? <Loader /> : ModalJSX
}
