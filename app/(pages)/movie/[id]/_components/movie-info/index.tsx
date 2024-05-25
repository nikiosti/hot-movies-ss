'use client'

import { useGetGenres } from '@/hooks/use-genres'
import { MovieDetails } from '@/types/Movies'
import { buildDate, buildTime } from '@/utils/formaters'
import { Box, Text, Group, NumberFormatter } from '@mantine/core'

import classes from './index.module.css'
const MovieInfo = ({ movie }: { movie: MovieDetails | undefined }) => {
  const { data: genres } = useGetGenres('genres')

  return (
    <Box h={148}>
      {[
        { label: 'Duration', value: buildTime(movie?.runtime) },
        { label: 'Premiere', value: buildDate(movie?.release_date as string) },
        { label: 'Budget', value: <NumberFormatter prefix="$ " value={movie?.budget} thousandSeparator /> },
        { label: 'Gross worldwide', value: <NumberFormatter prefix="$ " value={movie?.revenue} thousandSeparator /> },
        {
          label: 'Genres',
          value: movie?.genres
            ?.map((genreId) => genres?.find((option) => option.value === genreId.id.toString())?.label)
            .filter((label) => label !== undefined)
            .join(', '),
        },
      ].map((item, index) => (
        <Group h={19} key={index} mb={12}>
          <Text w={140} className={classes.label}>
            {item.label}
          </Text>
          <Text lineClamp={1} className={classes.value}>
            {item.value}
          </Text>
        </Group>
      ))}
    </Box>
  )
}

export default MovieInfo
