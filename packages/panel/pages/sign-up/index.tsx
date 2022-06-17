import { ReactElement } from 'react'
import { PublicLayout, SignUpJSX } from '@keszflow/components'
import { NextPageWithLayout } from '../../types'
;(SignUpJSX as NextPageWithLayout).getLayout = (page: ReactElement) => (
  <PublicLayout>{page}</PublicLayout>
)
export default SignUpJSX
