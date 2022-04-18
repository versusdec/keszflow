import React from 'react'
import { InvoiceList } from '@keszflow/components'
import { useInvoices } from '../../hooks/useInvoices'

export const AccountantDashboard = () => {
  const { invoices } = useInvoices()

  return <InvoiceList invoices={invoices} />
}
