import React, { ReactElement } from 'react'

import { View } from '@keszflow/components'
import Link from 'next/link'

const Test = () => {
  return (
    <>
      <h1>TEST</h1>
      <Link href="/">HOME</Link>
      <br />
      <Link href="/invoices">INVOICES</Link>
    </>
  )
}

Test.getLayout = function getLayout(page: ReactElement) {
  return <View title={'Test'}>{page}</View>
}

export default Test
