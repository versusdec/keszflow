import React, { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Header } from '@keszflow/components'
import { View } from '@keszflow/components'
import { QueryClient, QueryClientProvider } from 'react-query'

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          height: '100%',
          maxHeight: '100vh',
        },
        html: {
          height: '100%',
        },
        '#__next': {
          height: '100%',
        },
        img: {
          display: 'block',
        },
      },
    },
  },
})

//@todo prevent layouts rerender

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
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page)

  return getLayout(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Component {...pageProps} />
        </CssBaseline>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
