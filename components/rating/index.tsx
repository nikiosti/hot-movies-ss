import { ActionIcon, Group, Text } from '@mantine/core'
import { IconStar } from '@/ui'
import { Movie } from '../movies/movies-list'

interface Rating {
  onSetCurrentFavorite: (id: number, name: string) => void
  favorite: { id: number; rating: number } | undefined
  movie: Movie
}

export const Rating = ({ favorite, onSetCurrentFavorite, movie }: Rating) => {
  return (
    <Group gap={4} h={28} wrap="nowrap">
      <ActionIcon
        onClick={() => onSetCurrentFavorite(movie?.id as number, movie?.original_title as string)}
        variant="transparent"
        size={28}
      >
        <IconStar
          style={
            favorite
              ? { fill: 'var(--mantine-color-purple-5)', stroke: 'var(--mantine-color-purple-5)' }
              : { fill: 'var(--mantine-color-grey-2)', stroke: 'var(--mantine-color-grey-2)' }
          }
        />
      </ActionIcon>
      <Text fw={600} fz={16} lh="16px" fs="normal">
        {favorite?.rating}
      </Text>
    </Group>
  )
}
