import React from 'react';
import type {ReactElement} from 'react'

import {View} from "@keszflow/components";
import Link from "next/link";

const Invoices = () => {

    return(
        <>
            <h1>INVOICES</h1>
            <Link href="/">HOME</Link>
            <br/>
            <Link href="/test">TEST</Link>
        </>
    )
}

Invoices.getLayout = function getLayout(page: ReactElement) {
    return (
        <View title={'Test'}>
            {page}
        </View>
    )
}

export default Invoices