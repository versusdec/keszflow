import React, { ReactElement } from 'react'

import { PublicLayout, Recover } from '@keszflow/components'
import { NextPageWithLayout } from '../../types'

const RecoverJSX = () => {
  const handleSubmit = (values: { email: string }) => {
    console.log(values)
  }

  return <Recover handleSubmit={handleSubmit} />
}

;(RecoverJSX as unknown as NextPageWithLayout).getLayout = (
  page: ReactElement
) => <PublicLayout>{page}</PublicLayout>
export default RecoverJSX
