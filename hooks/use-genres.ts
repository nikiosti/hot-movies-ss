import { useQuery } from '@tanstack/react-query'
import { client } from '@/lib/client'
import { Genre } from '@/types/Genre'

const getData = async (url: string) => {
  const { data } = await client.get(url)
  return data
}

const useGetGenres = (qKey: string, url: string) => {
  const query = useQuery<{ genres: Genre[] }>({
    queryFn: () => getData(url),
    queryKey: [qKey],
  })

  return query
}

export { useGetGenres }
