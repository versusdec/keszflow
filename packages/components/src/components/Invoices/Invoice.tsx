import React from 'react'
import { Paper, Modal, Box, Typography, IconButton } from '@mui/material'
import { CloseOutlined } from '@mui/icons-material'

export const getInvoice = () => {}

export const Invoice = (data: any) => {
  const modalHandler = () => {
    data.openHandler(0)
  }

  return (
    <>
      <Modal open={true} onClose={modalHandler}>
        <Box
          component={Paper}
          sx={{
            position: 'absolute',
            top: 30,
            left: 30,
            right: 30,
            bottom: 30,
            bgcolor: 'background.paper',
            p: 3,
          }}
        >
          <IconButton
            onClick={modalHandler}
            color={'primary'}
            sx={{
              position: 'absolute',
              right: 30,
              top: 30,
            }}
          >
            <CloseOutlined fontSize={'large'} />
          </IconButton>
          IM INVOICE ID: {data.id}
        </Box>
      </Modal>
    </>
  )
}
