import { useQuery } from 'react-query'
import { Invoice } from '@keszflow/components/src/components/Invoices/Create'
import { useEffect, useState } from 'react'

export const useInvoice = (id: number) => {
  const [fetching, setFetching] = useState(false)
  const { data, isFetching, isError } = useQuery<Invoice>(
    ['invoices/get2.json', id],
    {
      enabled: true,
      refetchOnWindowFocus: false,
    }
  )

  useEffect(() => {
    setFetching(isFetching)
  }, [isFetching])

  return { data, fetching, isError }
}
