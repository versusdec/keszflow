import {
  Box,
  IconButton,
  DialogTitle,
  DialogContent,
  Dialog,
} from '@mui/material'
import { Close } from '@mui/icons-material'

export const getInvoice = () => {}

export const Invoice = (data: any) => {
  const modalHandler = () => {
    data.openHandler(0)
  }

  return (
    <>
      <Dialog
        open={true}
        onClose={modalHandler}
        fullWidth={true}
        scroll={'paper'}
        maxWidth={'md'}
      >
        <DialogTitle sx={{ pr: 10 }}>
          <IconButton
            aria-label="close"
            onClick={modalHandler}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.primary.main,
            }}
          >
            <Close />
          </IconButton>
          Invoice #{data.id}
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{}}></Box>
        </DialogContent>
      </Dialog>
    </>
  )
}
