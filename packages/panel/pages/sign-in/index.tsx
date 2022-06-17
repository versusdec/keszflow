import { ReactElement } from 'react'
import { PublicLayout, SignInJSX } from '@keszflow/components'
import { NextPageWithLayout } from '../../types'
;(SignInJSX as NextPageWithLayout).getLayout = (page: ReactElement) => (
  <PublicLayout>{page}</PublicLayout>
)
export default SignInJSX
