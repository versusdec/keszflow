import { useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material'
import { Close } from '@mui/icons-material'
import { useInvoice } from '@keszflow/panel/hooks/useInvoice'
import { Loader } from '@keszflow/components/src/components/Loader'
import { InvoiceForm, useForm } from './Form'

export const useCreateModal = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const handleCreateModal = () => {
    setCreateModalOpen(!createModalOpen)
  }
  return { createModalOpen, handleCreateModal }
}

export interface IDatesInfo {
  issue: string | null
  end: string | null
  due: string | null
}

export interface IItemInfo {
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

export interface ISellerInfo {
  name: string
  country: 'poland' | 'ukraine'
  address_line_1: string
  address_line_2?: string
  address_line_3?: string
}

export interface IInvoice {
  no: string
  file: string
  seller: ISellerInfo
  buyer: ISellerInfo
  dates: IDatesInfo
  payment: 'cash' | 'bank' | string
  items: IItemInfo[]
}

interface CreateModalProps {
  open: boolean
  onClose: () => void
  item?: IInvoice
  id?: number
}

export const InvoiceCreate = ({ open, onClose, id }: CreateModalProps) => {
  const { formRef, handleSubmit } = useForm()
  const res = useInvoice(id)

  const item = res.data
  const isFetching = res.isFetching

  const ModalJSX = (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth={true}
        scroll={'paper'}
        maxWidth={'lg'}
      >
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
          <InvoiceForm invoice={item} innerRef={formRef} />
        </DialogContent>
        <DialogActions>
          <Button
            type={'submit'}
            variant={'contained'}
            onClick={() => {
              handleSubmit()
            }}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
  return isFetching ? <Loader /> : ModalJSX
}
