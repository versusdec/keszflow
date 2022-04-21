import { useQuery } from 'react-query'

export const useInvoice = (id: number) => {
  const { data, isFetching, isError } = useQuery(['invoices/get.json'], {
    enabled: true,
  })
  return {
    invoice: data,
    isFetching,
    isError,
  }
}
