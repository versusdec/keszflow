import { useQuery } from 'react-query'

export const useServer = () => {
  const { data } = useQuery(['invoice.pdf'], {
    enabled: true,
  })
  return {
    data,
  }
}
