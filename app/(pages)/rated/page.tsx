'use client'

import { useParallelMovie } from '@/hooks/use-movies'
import { MovieDetails } from '@/types/Movies'
import { useLocalStorage } from '@mantine/hooks'
import { useGetGenres } from '@/hooks/use-genres'
import { CLIENT_GENRE_URL } from '@/constants/api-constants'
import { useEffect, useState } from 'react'
import { Pagination } from '@/components/pagination/pagination'
import { Box, TextInput } from '@mantine/core'
import { MoviesList } from '@/components/movies'

const Page = () => {
  const [favoritesLC, setFavoritesLC] = useLocalStorage<{ id: number; rating: number }[]>({
    key: 'favoritesLC',
    defaultValue: [],
  })

  const movies = useParallelMovie(favoritesLC).map((query) => query.data)

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

  useEffect(() => {
    if (paginatedMovies.length === 0) {
      setPage(1)
    }
  }, [paginatedMovies])

  return (
    <Box mx={90} pt={41.5}>
      <TextInput
        placeholder="Search by title"
        value={searchTerm}
        onChange={(event) => {
          if (activePage !== 1) {
            setPage(1)
          }
          setSearchTerm(event.target.value)
        }}
      />
      <MoviesList moviesData={paginatedMovies as MovieDetails[]} getGenres={getGenres} />
      {filteredMovies.length > itemsPerPage && (
        <Pagination
          total={Math.ceil(filteredMovies.length / itemsPerPage)}
          activePage={activePage}
          setActivePage={setPage}
        />
      )}
    </Box>
  )
}

export default Page
