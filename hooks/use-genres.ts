import { useQuery } from '@tanstack/react-query'
import { client } from '@/lib/client'
import { Genre } from '@/types/Genre'
import { CLIENT_GENRE_URL } from '@/constants/api-constants'

const getData = async () => {
  const { data } = await client.get(CLIENT_GENRE_URL)
  return data
}

const useGetGenres = (qKey: string) => {
  const { data, ...rest } = useQuery<{ genres: Genre[] }>({
    queryFn: () => getData(),
    queryKey: [qKey],
  })

  const genreOptions = data?.genres.map((genre) => ({
    value: genre.id.toString(),
    label: genre.name,
  }))

  return { ...rest, data: genreOptions }
}

export { useGetGenres }
