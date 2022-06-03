import { useQuery } from 'react-query'
import { Invoice } from '@keszflow/components/src/components/Invoices/Create'

export const useInvoice = (id: number) => {
  const { data, isFetching, isError } = useQuery<Invoice>(
    ['invoices/get2.json', id],
    {
      enabled: true,
      refetchOnWindowFocus: false,
    }
  )

  return { data, isFetching, isError }
}
