'use client'

import { useParallelMovie } from '@/hooks/use-movies'
import { MovieDetails } from '@/types/Movies'
import { useLocalStorage, useMediaQuery } from '@mantine/hooks'
import { useGetGenres } from '@/hooks/use-genres'
import { useEffect, useState } from 'react'
import { Pagination } from '@/components/pagination'
import { Box, Center, Group, Loader, Title } from '@mantine/core'
import { MoviesList } from '@/components/movies'
import { RatedMovieNotFound } from './_components/rated-movie-not-found'
import { MovieNotFound } from '@/components/movies/movie-not-found'
import SearchBar from './_components/search-bar'

const Page = () => {
  const [favoritesLC, setFavoritesLC] = useLocalStorage<{ id: number; rating: number }[]>({
    key: 'favoritesLC',
    defaultValue: [],
  })

  const { data: movies, isPending, isSuccess } = useParallelMovie(favoritesLC)

  const { data: genres } = useGetGenres('genres')

  const getGenres = (movie: MovieDetails): string => {
    return movie?.genres
      .map((genreId) => genres?.find((option) => option.value === genreId.id.toString())?.label)
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

  const handleSearchClick = () => {
    if (activePage !== 1) {
      setPage(1)
    }
    setSearchTerm(searchValue)
  }

  useEffect(() => {
    if (paginatedMovies.length === 0) {
      setPage(1)
    }
  }, [paginatedMovies])

  if (isPending || favoritesLC.length === 0) {
    return <Center h="100vh">{favoritesLC.length === 0 ? <RatedMovieNotFound /> : <Loader />}</Center>
  }

  return (
    <Box mx={md ? 90 : 5} pt={41.5} pos="relative" h="100vh">
      <Group justify="space-between">
        <Title order={1} fz={32} fw={700} lh="140%" fs="normal">
          Rated movies
        </Title>

        <SearchBar onSearch={handleSearchClick} searchValue={searchValue} setSearchValue={setSearchValue} />
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
