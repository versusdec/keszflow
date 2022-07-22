import React from 'react'
import { InvoiceList } from '@keszflow/components'
import { useInvoices } from '../../hooks/useInvoices'

const AccountantDashboard = () => {
  const { data } = useInvoices()

  return <InvoiceList openInvoiceHandler={() => {}} invoices={data} />
}

export default AccountantDashboard
