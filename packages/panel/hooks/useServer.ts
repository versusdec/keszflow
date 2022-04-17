import { useQuery } from 'react-query'

export const useServer = () => {
  const { data } = useQuery(['index.json'], {
    enabled: true,
  })
  return {
    data,
  }
}
