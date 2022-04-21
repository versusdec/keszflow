import { useQuery } from 'react-query'

export const useInvoices = () => {
  const { data, isFetching, isError } = useQuery(['invoices/list.json'], {
    enabled: true,
  })

  return {
    data,
    isFetching,
    isError,
  }
}
