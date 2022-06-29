import React, {
  createContext,
  ReactElement,
  SetStateAction,
  useState,
  Dispatch,
} from 'react'
import {
  Head,
  Footer,
  Header,
  InvoiceUpload,
  useUploadModal,
} from '@keszflow/components'
import { Box } from '@mui/material'

interface Props {
  children?: ReactElement
  title?: string
}

type AppContextState = { sortableDragging: boolean }

type AppContextValue = {
  store: AppContextState
  setStore: Dispatch<SetStateAction<AppContextState>>
}

const defaultStore = { sortableDragging: false }

export const AppContext = createContext<AppContextValue | undefined>(undefined)

export default function AuthenticatedLayout(props: Props) {
  const { uploadModalOpen, handleUploadModal } = useUploadModal()
  const [store, setStore] = useState(defaultStore)

  return (
    <>
      <AppContext.Provider value={{ store, setStore }}>
        <Box
          onDragEnter={(e) => {
            e.preventDefault()
            e.stopPropagation()
            !store.sortableDragging && handleUploadModal()
          }}
        >
          <Head title={props.title} />
          <Box
            sx={{
              bgcolor: 'background.paper',
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Header />
            <Box
              component="main"
              m={3}
              sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
            >
              {props.children}
            </Box>
            <Footer />
          </Box>
        </Box>
        <InvoiceUpload open={uploadModalOpen} onClose={handleUploadModal} />
      </AppContext.Provider>
    </>
  )
}
