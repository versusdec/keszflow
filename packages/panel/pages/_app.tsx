// import React from 'react'
import type {ReactElement, ReactNode} from 'react'
import type {NextPage} from 'next'
import type {AppProps} from 'next/app'
import CssBaseline from '@mui/material/CssBaseline';
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {Header} from "@keszflow/components";
import {View} from '@keszflow/components'
import React from 'react';


const theme = createTheme({
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    height: '100%',
                    maxHeight: '100vh'
                },
                html: {
                    height: '100%',
                },
                '#__next': {
                    height: '100%'
                },
                img: {
                    display: "block"
                }
            }
        }
    }
});

//@todo prevent layouts rerender

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

export default function MyApp({Component, pageProps}: AppPropsWithLayout) {
    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout ?? ((page) => page)

    return getLayout(
        <ThemeProvider theme={theme}>
            <CssBaseline>
                <Component {...pageProps} />
            </CssBaseline>
        </ThemeProvider>
    )
}