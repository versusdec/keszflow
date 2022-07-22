import React, { ReactElement } from 'react'

import { PublicLayout, SignIn } from '@keszflow/components'
import { NextPageWithLayout } from '../../types'
;(SignIn as unknown as NextPageWithLayout).getLayout = (page: ReactElement) => (
  <PublicLayout>{page}</PublicLayout>
)
export default SignIn
