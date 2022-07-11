import { useQuery } from 'react-query'
import { IInvoice } from '@keszflow/components/src/components/Invoices/Create'

export const useInvoice = (id: number | undefined) => {
  const { data, isFetching, isError } = useQuery<IInvoice>(
    ['invoices/get5.json', id],
    {
      enabled: !!id,
      refetchOnWindowFocus: false,
    }
  )

  return { data, isFetching, isError }
}
