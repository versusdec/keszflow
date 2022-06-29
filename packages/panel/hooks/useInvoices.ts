import { useQuery } from 'react-query'

export interface invoiceData {
  id: number
  date: string
  name: string
  total: number
  status: string
  type: 'created' | 'uploaded'
}

export const useInvoices = () => {
  const { data, isFetching, isError } = useQuery<invoiceData[]>(
    ['invoices/list4.json'],
    {
      enabled: true,
    }
  )

  return {
    data,
    isFetching,
    isError,
  }
}
