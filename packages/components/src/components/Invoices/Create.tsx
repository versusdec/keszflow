import React, { useRef, useState } from 'react'
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogTitle,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material'
import {
  FileUploadOutlined,
  BorderColorOutlined,
  CreateOutlined,
} from '@mui/icons-material'

export interface SimpleDialogProps {
  open: boolean
  selectedValue: string
  onClose: (value: string) => void
  anchorEl: null | HTMLElement
}

export interface CreateModalProps {
  open: boolean
  onSave: () => void
  onClose: () => void
}

const CreateModal = (props: CreateModalProps) => {
  const { onClose, onSave, open } = props

  const handleClose = () => {}

  return <></>
}

const SelectCreateOptions = (props: SimpleDialogProps) => {
  const { onClose, selectedValue, open, anchorEl } = props

  const handleClose = () => {
    onClose(selectedValue)
  }

  const handleListItemClick = (value: string) => {
    onClose(value)
  }

  return (
    <Menu
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
    >
      <MenuItem onClick={() => handleListItemClick('upload')}>
        <ListItemIcon>
          <FileUploadOutlined />
        </ListItemIcon>
        <ListItemText primary="Upload File" />
      </MenuItem>
      <Divider />
      <MenuItem onClick={() => handleListItemClick('create')}>
        <ListItemIcon>
          <CreateOutlined />
        </ListItemIcon>
        <ListItemText primary="Create" />
      </MenuItem>
    </Menu>
  )
}

const useSelectDialog = () => {
  const [open, setOpen] = useState(false)
  const [option, setOption] = useState('')
  const buttonEl = useRef(null)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = (value: string) => {
    setOpen(false)
    setOption(value)
    console.log(value)
  }

  return { open, handleOpen, handleClose, buttonEl, option }
}

export const InvoiceCreate = () => {
  const { option, open, handleOpen, handleClose, buttonEl } = useSelectDialog()

  return (
    <>
      <Button ref={buttonEl} variant="contained" onClick={handleOpen}>
        Add invoice
      </Button>
      <SelectCreateOptions
        anchorEl={buttonEl.current}
        selectedValue={option}
        open={open}
        onClose={handleClose}
      />
    </>
  )
}
