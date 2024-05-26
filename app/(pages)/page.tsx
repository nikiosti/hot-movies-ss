'use client'
import { CLIENT_MOVIES_URL } from '@/constants/api-constants'
import { Filters } from './_components/filters'
import { MoviesList } from '@/components/movies'
import { MovieResult } from '@/types/Movies'
import { useGetMovies } from '@/hooks/use-movies'
import { buildUrlWithParameters } from '@/lib/api'
import { useForm } from '@mantine/form'
import { SORT_BY_DATA } from '@/constants/filter-constants'

import { FilterForm } from '@/types/Form'
import { useEffect, useState } from 'react'
import { useGetGenres } from '@/hooks/use-genres'

import { Pagination } from '@/components/pagination'
import { Box, Grid, GridCol, Title } from '@mantine/core'
import { MoviesSkeleton } from '@/components/movies/movies-skeleton'
import { MovieNotFound } from '@/components/movies/movie-not-found'

import classes from './page.module.css'
import { useDebouncedValue, useMediaQuery } from '@mantine/hooks'

const Page = () => {
  const [activePage, setActivePage] = useState<number>(1)

  const form = useForm<FilterForm>({
    initialValues: {
      genres: [],
      releaseYear: '',
      sortBy: SORT_BY_DATA[0].value,
      voteAverageLte: '',
      voteAverageGte: '',
    },
  })
  const [debounced] = useDebouncedValue(form.values, 600)
  const url = buildUrlWithParameters(CLIENT_MOVIES_URL, {
    language: 'en-US',
    page: activePage,
    sort_by: form.values.sortBy,
    with_genres: form.values.genres,
    primary_release_year: form.values.releaseYear,
    'vote_average.gte': debounced.voteAverageGte,
    'vote_average.lte': debounced.voteAverageLte,
  })

  const { data: moviesData, isLoading } = useGetMovies(url)
  const { data: genres } = useGetGenres('genres')

  const getGenres = (movie: MovieResult) => {
    return movie?.genre_ids
      ?.map((genreId) => genres?.find((option) => option.value === genreId.toString())?.label)
      .filter((label) => label !== undefined)
      .join(', ')
  }

  useEffect(() => {
    setActivePage(1)
  }, [form.values])

  const md = useMediaQuery('(min-width: 62em)')
  return (
    <Box mx={md ? 90 : 5} pt={41.5}>
      <Title order={3} className={classes.title}>
        Movies
      </Title>

      <Filters form={form} genres={genres} />

      {moviesData?.results.length === 0 && (
        <Box pos="relative" h={250}>
          <MovieNotFound />
        </Box>
      )}

      {isLoading ? (
        <MoviesSkeleton key="skeleton" count={20} />
      ) : (
        <MoviesList moviesData={moviesData?.results as MovieResult[]} getGenres={getGenres} key="moviesList" />
      )}

      <Box h={24} />

      {moviesData?.results.length !== 0 && (
        <Box pos="absolute" right={0}>
          <Pagination
            key="pagination"
            total={(moviesData?.total_pages as number) >= 500 ? 500 : (moviesData?.total_pages as number)}
            activePage={activePage}
            setActivePage={setActivePage}
          />
        </Box>
      )}

      <Box h={82} />
    </Box>
  )
}

export default Page
