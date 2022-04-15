import React from "react";
import type {ReactElement} from 'react'
import {Footer, Header} from '@keszflow/components'
import {Sidebar} from '@keszflow/components'
import Head from 'next/head'
import {Grid, Box} from '@mui/material'

interface Props {
    children?: ReactElement,
    title?: string
}

export default function Layout(props: Props) {
    return (
        <>
            <Head>
                <title>{props.title ? props.title + ' | Keszflow' : 'Keszflow'} </title>
                <link rel="icon" href="/img/favicon.ico" type="image/png"/>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
            </Head>
            <Grid container sx={{height: '100%'}}>
                <Grid item>
                    <Sidebar/>
                </Grid>
                <Grid item sx={{flexGrow: 1}}>
                    <Box component={'main'} sx={{bgcolor: 'grey.50', height: '100%', display: 'flex', flexDirection: 'column'}}>
                        <Header/>
                        <Box component='article' sx={{flexGrow: 1}}>
                            {props.children}
                        </Box>
                        <Footer/>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

/*Layout.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>{page}</Layout>
    )
}*/


