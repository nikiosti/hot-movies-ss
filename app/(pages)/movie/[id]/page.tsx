'use client'
import { IconStar } from '@/ui'

import { ModalRating } from '@/ui'
import { Rating } from '@/components/rating'
import { CLIENT_GENRE_URL, CLIENT_MOVIE_DETAIL_URL, TMDB_IMAGE_URL } from '@/constants/api-constants'
import { useGetGenres } from '@/hooks/use-genres'
import { useGetMovie } from '@/hooks/use-movies'

import { Box, Center, Group, Image, Loader, NumberFormatter, Paper, Stack, Text } from '@mantine/core'
import { useDisclosure, useLocalStorage } from '@mantine/hooks'

import { useState } from 'react'

import { Trailer } from './_components/trailer'
import { useErrorRedirect } from '@/hooks/use-error-redirect'
import { buildDate, buildSuffix, buildTime } from '@/utils/formaters'
import classes from './page.module.css'
import { Breadcrumbs } from './_components/bread-crumbs'
import MovieInfo from './_components/movie-info'
const Page = ({ params }: { params: { id: string } }) => {
  const {
    data: movie,
    isError,
    isPending,
  } = useGetMovie(CLIENT_MOVIE_DETAIL_URL + '/' + params.id + '?append_to_response=videos', params.id)

  useErrorRedirect(isError)

  const [favoritesLC, setFavoritesLC] = useLocalStorage<{ id: number; rating: number }[]>({
    key: 'favoritesLC',
    defaultValue: [],
  })

  const [openedModalRating, { open: openModalRating, close: closeModalRating }] = useDisclosure(false)

  const [currentFavorite, setCurrentFavorite] = useState<{ id: number; rating: number; name: string }>({
    id: NaN,
    name: '',
    rating: 0,
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

  if (isPending) {
    return (
      <Center h="100vh">
        <Loader />
      </Center>
    )
  }
  return (
    <Box mx={180} pt={40}>
      <Breadcrumbs originalTitle={movie?.original_title} />

      <Paper className={classes.paper}>
        <Group className={classes.group}>
          <Group gap={16} className={classes.group}>
            <Image w={250} h={352} src={TMDB_IMAGE_URL + movie?.poster_path} fallbackSrc="/poster-fallback.svg" />
            <Stack className={classes.stack}>
              <div>
                <Text className={classes.text}>{movie?.original_title}</Text>

                <Text className={classes.textGrey} mt={8}>
                  {new Date(movie?.release_date as string)?.getFullYear()}
                </Text>
                <Group gap={8} wrap="nowrap" mt={8}>
                  <Group gap={4} wrap="nowrap">
                    <IconStar
                      style={{ stroke: 'var(--mantine-color-yellow-4)', fill: 'var(--mantine-color-yellow-4)' }}
                    />
                    <Text fw={600} lh="20px" fz={16} fs="normal">
                      {movie?.vote_average?.toFixed(1)}
                    </Text>
                  </Group>
                  <Text fz={16} fw={400} lh="normal" fs="normal" c="grey.6">
                    ({buildSuffix(movie?.vote_count as number)})
                  </Text>
                </Group>
              </div>
             <MovieInfo movie={movie} />
            </Stack>
          </Group>
          <Rating
            movie={movie}
            onSetCurrentFavorite={onSetCurrentFavorite}
            favorite={favoritesLC.find((fav) => fav.id === movie?.id)}
          />
        </Group>
      </Paper>

      <Trailer movie={movie} />

      <ModalRating
        closeModalRating={closeModalRating}
        openedModalRating={openedModalRating}
        setCurrentFavorite={setCurrentFavorite}
        currentFavorite={currentFavorite}
        handleFavoriteClick={handleFavoriteClick}
      />

      <Box h={367} />
    </Box>
  )
}

export default Page
