import React, { ReactElement } from 'react'

import { PublicLayout, SignUp } from '@keszflow/components'
import { NextPageWithLayout } from '../../types'
;(SignUp as unknown as NextPageWithLayout).getLayout = (page: ReactElement) => (
  <PublicLayout>{page}</PublicLayout>
)
export default SignUp
