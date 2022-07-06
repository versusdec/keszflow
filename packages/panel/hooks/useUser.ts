import { useQuery } from 'react-query'

export interface IUser {
  id: number
  name: string
  lastname: string
  patronymic: string
  email: string
  gender: 'male' | 'female' | 'other'
  language: string
  role: 'admin' | 'accountant' | 'public'
  status: string
  avatar: string
}

export const useUser = () => {
  const { data, isFetching, isError } = useQuery<IUser>(['users/me.json'], {
    enabled: true,
    refetchOnWindowFocus: false,
  })

  return { user: data, isFetching, isError }
}
