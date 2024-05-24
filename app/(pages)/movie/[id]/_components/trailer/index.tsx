'use client'
import { MovieDetails } from '@/types/Movies'
import { Avatar, Divider, Group, Image, Paper, Text, Title } from '@mantine/core'

import classes from './index.module.css'
import { IconClapperboard } from '@/ui'
export const Trailer = ({ movie }: { movie: MovieDetails | undefined }) => {
  const items = movie?.production_companies?.map((item, index) => (
    <Group gap={8} key={index} mt={12}>
      <Avatar
        src={'https://image.tmdb.org/t/p/w185' + item.logo_path}
        alt="production companies logo"
        variant="outline"
      >
        <IconClapperboard />
      </Avatar>
      <Text fz={16} fw={600} lh="140%" fs="normal">
        {item?.name}
      </Text>
    </Group>
  ))
  return (
    <Paper mt={20} p={24} radius={12}>
      <Title fz={20} fs="normal" fw={700} lh="20px">
        Trailer
      </Title>

      <iframe
        className={classes.video}
        src={'https://www.youtube.com/embed/' + movie?.videos?.results[0]?.key}
      ></iframe>
      <Divider my={20} />

      <Title fz={20} fs="normal" fw={700} lh="20px">
        Description
      </Title>
      <Divider my={20} />
      <Title fz={20} fs="normal" fw={700} lh="20px">
        Production
      </Title>

      {items}
    </Paper>
  )
}
