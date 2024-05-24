'use client'

import { TMDB_IMAGE_URL } from '@/constants/api-constants'
import { MovieDetails, MovieResult } from '@/types/Movies'
import { buildSuffix } from '@/utils/formaters'
import { Group, Image, Paper, Text, UnstyledButton } from '@mantine/core'
import { useRouter } from 'next/navigation'
import React from 'react'

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
          <div>
            <UnstyledButton>
              <Text
                c="purple.4"
                fw={600}
                fz={20}
                lh="normal"
                fs="normal"
                onClick={() => router.push('/movie/' + movie?.id)}
              >
                {movie?.original_title}
              </Text>
            </UnstyledButton>
            <Text>{new Date(movie?.release_date as string).getFullYear()}</Text>
            <Text> {buildSuffix(movie?.vote_count as number)}</Text>
            <Text lineClamp={1} w="100%">
              {genres}
            </Text>
          </div>
        </Group>
        {children}
      </Group>
    </Paper>
  )
}
