import type {NextPage} from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from "next/link";

// import {Dashboard} from "../../src/components/Dashboard";

const Test: NextPage = () => {

    return (
        <>
            <h1>Test</h1>
            <Link href='/'>home</Link>
        </>
    )
}

export default Test
