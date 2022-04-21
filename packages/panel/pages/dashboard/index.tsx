import React from 'react'
import { BusinessDashboard } from './business'
import { AccountantDashboard } from './accountant'

export default () => {
  // todo select dashboard based on user role
  const user = {
    id: 1,
    role: 'admin',
    // role: 'accountant'
  }
  switch (user.role) {
    case 'admin':
      return <BusinessDashboard />
    case 'accountant':
      return <AccountantDashboard />
    default:
      return <>public dashboard/redirect to login</>
  }
}
