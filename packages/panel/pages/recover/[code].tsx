import React, { ReactElement } from 'react'
import { useRouter } from 'next/router'

import { PublicLayout, Password } from '@keszflow/components'
import { NextPageWithLayout } from '../../types'

const PasswordJSX = () => {
  const router = useRouter()
  const { code } = router.query
  console.log(code)

  const handleSubmit = (values: {
    password: string
    confirmPassword: string
  }) => {
    console.log(values)
  }

  return <Password handleSubmit={handleSubmit} />
}

;(PasswordJSX as unknown as NextPageWithLayout).getLayout = (
  page: ReactElement
) => <PublicLayout>{page}</PublicLayout>
export default PasswordJSX
