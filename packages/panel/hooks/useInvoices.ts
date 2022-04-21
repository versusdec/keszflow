import { useQuery } from 'react-query'

export interface invoiceData {
  id: number
  date: string
  name: string
  total: number
  status: string
}

export const useInvoices = () => {
  const { data, isFetching, isError } = useQuery<invoiceData[]>(
    ['invoices/list.json'],
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
