import React, { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { View } from '@keszflow/components'
import { QueryClient, QueryClientProvider } from 'react-query'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { pdfjs } from 'react-pdf'
import theme from '@keszflow/components/src/layouts/theme'

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

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

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  return (
    <ThemeProvider theme={theme}>
      <View>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <QueryClientProvider client={queryClient}>
            <CssBaseline>
              <Component {...pageProps} />
            </CssBaseline>
          </QueryClientProvider>
        </LocalizationProvider>
      </View>
    </ThemeProvider>
  )
}
