'use client'

import { Rating } from '@/components/rating'
import { MovieDetails, MovieResult } from '@/types/Movies'
import { SimpleGrid } from '@mantine/core'
import { useDisclosure, useLocalStorage } from '@mantine/hooks'
import { useState } from 'react'
import { MovieItem } from '../movie-item'
import { ModalRating } from '@/components/modal'

export type Movie = MovieResult | MovieDetails | undefined

interface MoviesProps<T> {
  moviesData: T[]
  getGenres: (movie: T) => string
}

export const MoviesList = <T extends Movie>({ moviesData, getGenres }: MoviesProps<T>) => {
  const [favoritesLC, setFavoritesLC] = useLocalStorage<{ id: number; rating: number }[]>({
    key: 'favoritesLC',
    defaultValue: [],
  })

  const [openedModalRating, { open: openModalRating, close: closeModalRating }] = useDisclosure(false)

  const [currentFavorite, setCurrentFavorite] = useState<{ id: number; rating: number; name: string }>({
    id: NaN,
    rating: 0,
    name: '',
  })
  const [isRated, setIsRated] = useState<boolean>(false)
  const handleFavoriteClick = () => {
    if (isRated) {
      setFavoritesLC((value) =>
        value.map((favorite) =>
          favorite.id === currentFavorite.id ? { ...favorite, rating: currentFavorite.rating } : favorite
        )
      )
    } else {
      setFavoritesLC([...favoritesLC, currentFavorite])
      setIsRated(true)
    }
  }

  const onSetCurrentFavorite = (id: number, name: string) => {
    const favoriteMovie = favoritesLC.find((fav) => fav.id === id)

    if (favoriteMovie) {
      setIsRated(true)
      setCurrentFavorite({ ...favoriteMovie, name })
    } else {
      setIsRated(false)
      setCurrentFavorite({ id, name, rating: 0 })
    }
    openModalRating()
  }
  return (
    <>
      <SimpleGrid cols={{ base: 1, xl: 2 }} spacing={16} verticalSpacing={16}>
        {moviesData?.map((movie) => (
          <MovieItem key={movie?.id} movie={movie} genres={getGenres(movie)}>
            <Rating
              movie={movie}
              onSetCurrentFavorite={onSetCurrentFavorite}
              favorite={favoritesLC.find((fav) => fav.id === movie?.id)}
            />
          </MovieItem>
        ))}
      </SimpleGrid>

      <ModalRating
        closeModalRating={closeModalRating}
        openedModalRating={openedModalRating}
        setCurrentFavorite={setCurrentFavorite}
        currentFavorite={currentFavorite}
        handleFavoriteClick={handleFavoriteClick}
      />
    </>
  )
}
