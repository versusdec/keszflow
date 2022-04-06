import React from "react";
import type {ReactElement} from 'react'
import {Header} from '../../components/Header'
import {Sidebar} from '../../components/Sidebar'
import Head from 'next/head'

interface Props {
    children?: ReactElement,
    title?: string
}

export const View = (props: Props) => {
    return (
        <>
            <Head>
                <title>{props?.title} | Keszflow</title>
                <link rel="icon" href="/img/favicon.ico" type="image/png"/>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                />
            </Head>
            <article>
                <Sidebar/>
                <main>
                    <Header/>
                    <article>
                        {props.children}
                    </article>
                </main>
            </article>

        </>
    )
}
