'use client'

import { TMDB_IMAGE_URL } from '@/constants/api-constants'
import { MovieDetails, MovieResult } from '@/types/Movies'
import { IconStar } from '@/ui'
import { buildSuffix } from '@/utils/formaters'
import { Group, Image, Paper, Stack, Text, UnstyledButton } from '@mantine/core'
import { useRouter } from 'next/navigation'
import React from 'react'

import classes from './index.module.css'

interface MovieProps {
  movie: MovieResult | MovieDetails | undefined
  genres: string
  children: React.ReactNode
}

export const MovieItem: React.FC<MovieProps> = ({ movie, children, genres }) => {
  const router = useRouter()
  return (
    <Paper className={classes.card}>
      <Group className={classes.group}>
        <Group h="100%" gap={16} wrap="nowrap" align="flex-start">
          <Image w={119} h={170} src={TMDB_IMAGE_URL + movie?.poster_path} fallbackSrc="/poster-fallback.svg" />
          <Stack h='100%' justify="space-between">
            <div>
              <UnstyledButton onClick={() => router.push('/movie/' + movie?.id)}>
                <Text lineClamp={2} className={classes.textButton}>
                  {movie?.original_title}
                </Text>
              </UnstyledButton>
              <Text lineClamp={1} c="grey.6" fz={16} fw={400} lh="20px" mt={8}>
                {new Date(movie?.release_date as string).getFullYear()}
              </Text>
              <Group gap={8} mt={8}>
                <Group gap={4}>
                  <IconStar
                    style={{ stroke: 'var(--mantine-color-yellow-4)', fill: 'var(--mantine-color-yellow-4)' }}
                  />
                  <Text lineClamp={1} className={classes.voteAverageText}>
                    {movie?.vote_average?.toFixed(1)}
                  </Text>
                </Group>
                <Text lineClamp={1} className={classes.voteCountText}>
                  ({buildSuffix(movie?.vote_count as number)})
                </Text>
              </Group>
            </div>
            <Group wrap="nowrap" gap={8}>
              <Text className={classes.voteCountText}>Genres</Text>
              <Text lineClamp={1} w="100%">
                {genres}
              </Text>
            </Group>
          </Stack>
        </Group>
        {children}
      </Group>
    </Paper>
  )
}
