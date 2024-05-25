import { useQueries, useQuery, UseQueryOptions } from '@tanstack/react-query'
import { client } from '@/lib/client'
import { CLIENT_MOVIE_DETAIL_URL } from '@/constants/api-constants'
import { MovieData, MovieDetails } from '@/types/Movies'
import { useErrorRedirect } from './use-error-redirect'

const getData = async (url: string) => {
  const { data } = await client.get(url)

  return data
}

const useGetMovies = (url: string) => {
  const query = useQuery<MovieData>({
    queryFn: () => getData(url),
    queryKey: ['movies', url],
  })

  return query
}

const useGetMovie = (url: string, id: string) => {
  const query = useQuery<MovieDetails>({
    queryFn: () => getData(url),
    queryKey: ['movieDetail', id],
  })

  return query
}

const useParallelMovie = (movies: { id: number; rating: number }[]) => {
  const queries = useQueries({
    queries: movies.map<UseQueryOptions<MovieDetails, Error>>((movie) => {
      return {
        queryKey: ['movieRated', movie.id],
        queryFn: () => getData(CLIENT_MOVIE_DETAIL_URL + '/' + movie.id),
      }
    }),
    combine: (results) => ({
      data: results.map((r) => r.data),
      isPending: results.some((r) => r.isPending),
      isSuccess: results.some((r) => r.isSuccess),
    }),
  })
  return queries
}

export { useGetMovies, useParallelMovie, useGetMovie }
