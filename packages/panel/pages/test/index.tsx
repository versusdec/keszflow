import type {ReactElement} from 'react'

import {View} from "@keszflow/components";
import Link from "next/link";

const Test = () => {

    return(
        <>
            <h1>TEST</h1>
            <Link component={'a'} href="/">HOME</Link>
            <br/>
            <Link component={'a'} href="/invoices">INVOICES</Link>
        </>
    )
}

Test.getLayout = function getLayout(page: ReactElement) {
    return (
        <View title={'Test'}>
            {page}
        </View>
    )
}

export default Test