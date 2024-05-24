'use client'
import { IconStar } from '@/ui'

import { ModalRating } from '@/ui'
import { Rating } from '@/components/rating'
import { CLIENT_GENRE_URL, CLIENT_MOVIE_DETAIL_URL, TMDB_IMAGE_URL } from '@/constants/api-constants'
import { useGetGenres } from '@/hooks/use-genres'
import { useGetMovie } from '@/hooks/use-movies'
import { buildDate, buildSuffix, formatTime } from '@/utils/formaters'

import { Box, Breadcrumbs, Center, Group, Image, Loader, NumberFormatter, Paper, Stack, Text } from '@mantine/core'
import { useDisclosure, useLocalStorage } from '@mantine/hooks'
import Link from 'next/link'
import { useState } from 'react'

import classes from './page.module.css'
import { Trailer } from './_components/trailer'
import { useErrorRedirect } from '@/hooks/use-error-redirect'

const Page = ({ params }: { params: { id: string } }) => {
  const {
    data: movie,
    isError,
    isPending,
  } = useGetMovie(CLIENT_MOVIE_DETAIL_URL + '/' + params.id + '?append_to_response=videos', params.id)

  useErrorRedirect(isError)

  const items = [
    { title: 'Movies', href: '/' },
    { title: movie?.original_title, href: '' },
  ].map((item, index) => (
    <Link href={item.href} key={index}>
      {item.title}
    </Link>
  ))

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

  const { data: genres } = useGetGenres('genres', CLIENT_GENRE_URL)

  const genreOptions = genres?.genres.map((genre) => ({
    value: genre.id.toString(),
    label: genre.name,
  }))

  if (isPending) {
    return (
      <Center h="100vh">
        <Loader />
      </Center>
    )
  }
  return (
    <Box mx={180} pt={40}>
      <Breadcrumbs fz={14} fw={400} lh="20px" fs="normal">
        {items}
      </Breadcrumbs>

      <Paper p={24} radius={12} mt={20} h={400}>
        <Group align="flex-start" gap={8} wrap="nowrap" justify="space-between">
          <Group gap={16} wrap="nowrap" align="flex-start">
            <Image w={250} h={352} src={TMDB_IMAGE_URL + movie?.poster_path} fallbackSrc="/poster-fallback.svg" />
            <Stack justify="space-between" h="352">
              <div>
                <Text c="purple.4" fw={600} fz={20} lh="normal" fs="normal">
                  {movie?.original_title}
                </Text>

                <Text fz={16} fw={400} lh="normal" fs="normal" c="grey.6" mt={8}>
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
              <Box h={148}>
                <Group h={19}>
                  <Text w={140} className={classes.label}>
                    Duration
                  </Text>
                  <Text lineClamp={1} className={classes.value}>
                    {formatTime(movie?.runtime)}
                  </Text>
                </Group>
                <Group h={19} mt={12}>
                  <Text w={140} className={classes.label}>
                    Premiere
                  </Text>
                  <Text lineClamp={1} className={classes.value}>
                    {buildDate(movie?.release_date as string)}
                  </Text>
                </Group>
                <Group h={19} mt={12}>
                  <Text w={140} className={classes.label}>
                    Budget
                  </Text>
                  <Text lineClamp={1} className={classes.value}>
                    <NumberFormatter prefix="$ " value={movie?.budget} thousandSeparator />
                  </Text>
                </Group>
                <Group h={19} mt={12}>
                  <Text w={140} className={classes.label}>
                    Gross worldwide
                  </Text>
                  <Text lineClamp={1} className={classes.value}>
                    <NumberFormatter prefix="$ " value={movie?.revenue} thousandSeparator />
                  </Text>
                </Group>
                <Group h={19} mt={12}>
                  <Text w={140} className={classes.label}>
                    Genres
                  </Text>
                  <Text lineClamp={1} className={classes.value}>
                    {movie?.genres
                      ?.map((genreId) => genreOptions?.find((option) => option.value === genreId.id.toString())?.label)
                      .filter((label) => label !== undefined)
                      .join(', ')}
                  </Text>
                </Group>
              </Box>
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
    </Box>
  )
}

export default Page
