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
  const [files, setFiles] = useState<any>([])

  return { files, setFiles }
}

export const InvoiceUpload = ({ open, onClose, id }: UploadModalProps) => {
  const [rejected, setRejected] = useState(false)
  const [pages, setPages] = useState(false)
  const { files, setFiles } = useFile()

  const res = useInvoice(id)
  const item = res.data
  const isFetching = res.isFetching

  const onDrop = useCallback((acceptedFiles) => {
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

  const DropzoneJSX = !files.length && !item?.file && (
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

  const PreviewJSX = (!!files.length || item?.file) && (
    <>
      <Stack
        direction={'row'}
        spacing={2}
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Box
          id={'print-target'}
          sx={{
            width: '45%',
            flexShrink: 0,
            '& canvas': {
              width: '100%!important',
            },
          }}
        >
          <Document
            file={files[0] || item?.file}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={() => {
              return (
                <Box
                  p={3}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant={'h5'}>
                    Loading file. Please wait.
                  </Typography>
                </Box>
              )
            }}
            error={() => {
              return (
                <Box
                  p={3}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant={'h5'}>
                    Failed to load PDF file.
                  </Typography>
                </Box>
              )
            }}
          >
            {Array.from(new Array(pages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        </Box>
        <Box>
          <InvoiceForm invoice={item} list={true} type={'upload'} />
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
          <Button
            type={'button'}
            variant={'contained'}
            disabled={!files.length}
            onClick={(event) => {
              event.preventDefault()
              const iframe = document.createElement('iframe')
              iframe.style.display = 'none'
              iframe.src = files[0]
              iframe.id = 'iframe-to-print'
              document.body.appendChild(iframe)
              const print =
                document.querySelector<HTMLIFrameElement>('#iframe-to-print')!
              const content = print.contentWindow!
              content.focus()
              content.print()
            }}
          >
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
