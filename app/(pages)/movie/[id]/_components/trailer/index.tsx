'use client'
import { MovieDetails } from '@/types/Movies'
import { Avatar, Divider, Image, Paper, Title } from '@mantine/core'

import classes from './index.module.css'
export const Trailer = ({ movie }: { movie: MovieDetails | undefined }) => {
  const items = movie?.production_companies?.map((item, index) => (
    <div key={index}>
      <Avatar
        src={'https://image.tmdb.org/t/p/w185' + item.logo_path}
        alt="production companies logo"
        variant="outline"
      ></Avatar>
      <span>{item?.name}</span>
    </div>
  ))
  return (
    <Paper mt={20} p={24}>
      <Title fz={20} fs="normal" fw={700} lh="20px">
        Trailer
      </Title>

      <iframe
        className={classes.video}
        src={'https://www.youtube.com/embed/' + movie?.videos?.results[0]?.key}
      ></iframe>
      <Divider />

      <Title fz={20} fs="normal" fw={700} lh="20px">
        Description
      </Title>
      <Divider />
      <Title fz={20} fs="normal" fw={700} lh="20px">
        Production
      </Title>

      {items}
    </Paper>
  )
}
