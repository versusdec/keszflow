import React, {
  createContext,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
  Dispatch,
} from 'react'
import Head from 'next/head'
import {Footer, Header} from '@keszflow/components'
import {Box} from '@mui/material'
import {InvoiceUpload, useUploadModal} from '@keszflow/components'

interface Props {
  children?: ReactElement
  title?: string
}

// Dispatch<SetStateAction<boolean>>

type AppContextState = { sortableDragging: boolean }

type AppContextValue = {
  store: AppContextState
  setStore: Dispatch<SetStateAction<AppContextState>>
}

const defaultStore = {sortableDragging: false}

export const AppContext = createContext<AppContextValue | undefined>(undefined)

export default function AuthenticatedLayout(props: Props) {
  const {uploadModalOpen, handleUploadModal} = useUploadModal()
  const [sortable, setSortable] = useState(false)
  const [store, setStore] = useState(defaultStore)

  return (
    <>
      <AppContext.Provider value={{store, setStore}}>
        <Box
          onDragEnter={(e) => {
            e.preventDefault()
            e.stopPropagation()
            !store.sortableDragging && handleUploadModal()
          }}
          onDragEnd={() => {
            console.log('end')
          }}
          onDragLeave={() => {
            console.log('leave')
          }}
        >
          <Head>
            <title>
              {props.title ? props.title + ' | Keszflow' : 'Keszflow'}{' '}
            </title>
            <link rel="icon" href="/img/keszflow_logo.png" type="image/png"/>
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
            />
          </Head>
          <Box
            sx={{
              bgcolor: 'background.paper',
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Header/>
            <Box
              component="main"
              m={3}
              sx={{flexGrow: 1, display: 'flex', flexDirection: 'column'}}
            >
              {props.children}
            </Box>
            <InvoiceUpload open={uploadModalOpen} onClose={handleUploadModal}/>
            <Footer/>
          </Box>
        </Box>
      </AppContext.Provider>
    </>
  )
}

/* Layout.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>{page}</Layout>
    )
} */
