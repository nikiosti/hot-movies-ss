'use client'
import { CLIENT_GENRE_URL, CLIENT_MOVIES_URL } from '@/constants/api-constants'
import { Filters } from '../_components/filters'
import { MoviesList } from '@/components/movies'
import { MovieResult } from '@/types/Movies'
import { UseQueryResult } from '@tanstack/react-query'
import { useGetMovies } from '@/hooks/use-movies'
import { buildUrlWithParameters } from '@/lib/api'
import { useForm } from '@mantine/form'
import { SORT_BY_DATA } from '@/constants/filter-constants'

import { FilterForm } from '@/types/Form'
import { useState } from 'react'
import { useGetGenres } from '@/hooks/use-genres'
import { Genre } from '@/types/Genre'

import { Pagination } from '@/components/pagination/pagination'
import { Box, Title } from '@mantine/core'
import { MoviesSkeleton } from '@/components/movies/movies-skeleton'
import { MovieNotFound } from '@/components/movies/movie-not-found'

const Page = () => {
  const form = useForm<FilterForm>({
    initialValues: {
      genres: [],
      releaseYear: '',
      sortBy: SORT_BY_DATA[0].value,
      voteAverageLte: '',
      voteAverageGte: '',
    },
  })

  const [activePage, setActivePage] = useState<number>(1)

  const url = buildUrlWithParameters(CLIENT_MOVIES_URL, {
    language: 'en-US',
    page: activePage,
    sort_by: form.values.sortBy,
    with_genres: form.values.genres,
    primary_release_year: form.values.releaseYear,
    'vote_average.gte': form.values.voteAverageGte,
    'vote_average.lte': form.values.voteAverageLte,
  })

  const { data: moviesData, isLoading } = useGetMovies('movies', url)

  const { data: genres }: UseQueryResult<{ genres: Genre[] }> = useGetGenres('genres', CLIENT_GENRE_URL)

  const genreOptions = genres?.genres.map((genre) => ({
    value: genre.id.toString(),
    label: genre.name,
  }))

  const getGenres = (movie: MovieResult) => {
    return movie?.genre_ids
      ?.map((genreId) => genreOptions?.find((option) => option.value === genreId.toString())?.label)
      .filter((label) => label !== undefined)
      .join(', ')
  }

  return (
    <Box mx={90} pt={41.5}>
      <Title key="title" order={3} fz={32} fw={700} fs="normal" lh="140%">
        Movies
      </Title>
      <Filters form={form} genreOptions={genreOptions} key="filter" />
      {isLoading ? (
        <MoviesSkeleton key="skeleton" count={20} />
      ) : (
        <MoviesList moviesData={moviesData?.results as MovieResult[]} getGenres={getGenres} key="moviesList" />
      )}

      {moviesData?.results.length === 0 && <MovieNotFound />}
      <Pagination
        key="pagination"
        total={(moviesData?.total_pages as number) >= 500 ? 500 : (moviesData?.total_pages as number)}
        activePage={activePage}
        setActivePage={setActivePage}
      />
    </Box>
  )
}

export default Page
