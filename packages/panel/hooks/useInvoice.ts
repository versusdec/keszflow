import { useQuery } from 'react-query'
import { Invoice } from '@keszflow/components/src/components/Invoices/Create'

export const useInvoice = (id: number | undefined) => {
  const { data, isFetching, isError } = useQuery<Invoice>(
    ['invoices/get2.json', id],
    {
      enabled: !!id,
      refetchOnWindowFocus: false,
    }
  )

  return { data, isFetching, isError }
}
