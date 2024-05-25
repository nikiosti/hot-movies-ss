'use client'

import { useParallelMovie } from '@/hooks/use-movies'
import { MovieDetails } from '@/types/Movies'
import { useLocalStorage, useMediaQuery } from '@mantine/hooks'
import { useGetGenres } from '@/hooks/use-genres'
import { CLIENT_GENRE_URL } from '@/constants/api-constants'
import { useEffect, useState } from 'react'
import { Pagination } from '@/components/pagination'
import { Box, Button, Center, Group, Loader, TextInput, Title } from '@mantine/core'
import { MoviesList } from '@/components/movies'
import { IconSearch } from '@/ui'
import { RatedMovieNotFound } from './_components/rated-movie-not-found'
import { MovieNotFound } from '@/components/movies/movie-not-found'

const Page = () => {
  const [favoritesLC, setFavoritesLC] = useLocalStorage<{ id: number; rating: number }[]>({
    key: 'favoritesLC',
    defaultValue: [],
  })

  const { data: movies, isPending, isSuccess } = useParallelMovie(favoritesLC)

  const { data: genres } = useGetGenres('genres', CLIENT_GENRE_URL)

  const genreOptions = genres?.genres.map((genre) => ({
    value: genre.id.toString(),
    label: genre.name,
  }))

  const getGenres = (movie: MovieDetails): string => {
    return movie?.genres
      .map((genreId) => genreOptions?.find((option) => option.value === genreId.id.toString())?.label)
      .filter((label) => label !== undefined)
      .join(', ')
  }

  const [activePage, setPage] = useState(1)
  const itemsPerPage = 4
  const [searchTerm, setSearchTerm] = useState('')

  const filteredMovies = movies.filter((movie) =>
    movie?.original_title?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const paginatedMovies = filteredMovies.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage)

  const [searchValue, setSearchValue] = useState<string>('')
  const md = useMediaQuery('(min-width: 62em)')

  useEffect(() => {
    if (paginatedMovies.length === 0) {
      setPage(1)
    }
  }, [paginatedMovies])

  if (isPending || favoritesLC.length === 0) {
    return <Center h="100vh">{favoritesLC.length === 0 ? <RatedMovieNotFound /> : <Loader />}</Center>
  }

  return (
    <Box mx={md ? 90 : 5} pt={41.5} h="calc(100vh - 48px)">
      <Group justify="space-between">
        <Title order={1} fz={32} fw={700} lh="140%" fs="normal">
          Rated movies
        </Title>
        <TextInput
          radius={8}
          styles={{
            root: {},
            input: {
              height: 48,
              border: '1px solid var(--mantine-color-grey-3)',
            },
          }}
          maw={658}
          w="100%"
          leftSection={<IconSearch />}
          rightSectionWidth={100}
          rightSection={
            <Button
              color="purple.5"
              w={88}
              h={32}
              radius={8}
              onClick={() => {
                if (activePage !== 1) {
                  setPage(1)
                }
                setSearchTerm(searchValue)
              }}
            >
              Search
            </Button>
          }
          placeholder="Search movie title"
          value={searchValue}
          onChange={(event) => {
            setSearchValue(event.target.value)
          }}
        />
      </Group>
      {filteredMovies.length === 0 && isSuccess && <MovieNotFound />}

      <Box mt={40}>
        <MoviesList moviesData={paginatedMovies as MovieDetails[]} getGenres={getGenres} />
      </Box>
      <Center mt={24}>
        {filteredMovies.length > itemsPerPage && (
          <Pagination
            total={Math.ceil(filteredMovies.length / itemsPerPage)}
            activePage={activePage}
            setActivePage={setPage}
          />
        )}
      </Center>
    </Box>
  )
}

export default Page
