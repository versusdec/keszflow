import React, { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { View } from '@keszflow/components'
import { QueryClient, QueryClientProvider } from 'react-query'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { pdfjs } from 'react-pdf'

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js'

const globalTheme = createTheme()

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
        a: {
          textDecoration: 'none',
          color: globalTheme.palette.primary.dark,
        },
        '#__next': {
          height: '100%',
        },
        img: {
          display: 'block',
        },
        '.fc .fc-button': {
          // textTransform: 'uppercase!important',
          fontWeight: '500!important',
          fontSize: '0.87rem!important',
          lineHeight: '1.75!important',
          letterSpacing: '0.02857em!important',
          textTransform: 'uppercase!important',
          padding: '6px 16px!important',
          // borderRadius: '4px!important',
          border: 'none!important',
          boxShadow:
            '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
        },
        '.fc .fc-button:hover': {
          backgroundColor: '#1565c0!important',
          boxShadow:
            '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)!important',
        },
        '.fc .fc-button-group': {
          gap: 5,
        },
        '.fc .fc-button-primary': {
          backgroundColor: globalTheme.palette.primary.main + '!important',
          borderColor: globalTheme.palette.primary.main + '!important',
        },
        '.fc .fc-button:focus, .fc .fc-button-primary:focus': {
          boxShadow: 'none!important',
        },
        '.fc-daygrid-dot-event .fc-event-title': {
          whiteSpace: 'normal',
        },
        '.fc .fc-daygrid-event': {
          cursor: 'pointer',
        },
        '.fc .fc-timegrid-event': {
          padding: '5px!important',
          cursor: 'pointer!important',
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          flexBasis: 210,
        },
      },
    },
  },
})

// @todo prevent layouts rerender

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
    <View>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <CssBaseline>
              <Component {...pageProps} />
            </CssBaseline>
          </ThemeProvider>
        </QueryClientProvider>
      </LocalizationProvider>
    </View>
  )
}
