import React from 'react'
import { InvoiceList } from '@keszflow/components'
import { useInvoices } from '../../hooks/useInvoices'

export const AccountantDashboard = () => {
  const { data } = useInvoices()

  return <InvoiceList invoices={data} />
}
