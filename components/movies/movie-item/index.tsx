'use client'

import { TMDB_IMAGE_URL } from '@/constants/api-constants'
import { MovieDetails, MovieResult } from '@/types/Movies'
import { IconStar } from '@/ui'
import { buildSuffix } from '@/utils/formaters'
import { Group, Image, Paper, Stack, Text, UnstyledButton } from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
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
    <Paper h={218} p={24} radius={12}>
      <Group align="flex-start" gap={8} wrap="nowrap" justify="space-between">
        <Group gap={16} wrap="nowrap" align="flex-start">
          <Image w={119} h={170} src={TMDB_IMAGE_URL + movie?.poster_path} fallbackSrc="/poster-fallback.svg" />
          <Stack h={170} justify="space-between">
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
                  <Text lineClamp={1} fw={600} lh="20px" fz={16} fs="normal">
                    {movie?.vote_average?.toFixed(1)}
                  </Text>
                </Group>
                <Text lineClamp={1} fw={400} fz={16} lh="normal" c="grey.6">
                  ({buildSuffix(movie?.vote_count as number)})
                </Text>
              </Group>
            </div>
            <div>
              <Text lineClamp={1} w="100%">
                {genres}
              </Text>
            </div>
          </Stack>
        </Group>
        {children}
      </Group>
    </Paper>
  )
}
