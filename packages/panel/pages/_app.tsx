import React, { ReactElement } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { AuthenticatedLayout } from '@keszflow/components'
import { QueryClient, QueryClientProvider } from 'react-query'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { pdfjs } from 'react-pdf'
import { AppPropsWithLayout } from '../types'
import theme from '@keszflow/components/src/layouts/theme'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

const defaultQueryFn = async ({
  queryKey,
}: {
  queryKey: readonly unknown[] | [string]
}) => {
  const res = await fetch(`https://api.dev.keszflow.business/${queryKey[0]}`)
  return res.json()
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
})

const getDefaultLayout = (page: ReactElement) => (
  <AuthenticatedLayout>{page}</AuthenticatedLayout>
)

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? getDefaultLayout
  return (
    <>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <QueryClientProvider client={queryClient}>
            <CssBaseline>{getLayout(<Component {...pageProps} />)}</CssBaseline>
          </QueryClientProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </>
  )
}
