'use client'

import { Box, Center, Image, Title } from '@mantine/core'

export const RatedMovieNotFound = () => {
  return (
    <>
      <Center>
        <Box w={468}>
          <Center>
            <Image src="/notfound.png" w={233} alt="notfound image" />
          </Center>
          <Title ta="center" lh="normal" fw={600} fz={20} fs="normal" order={3}>
            You haven&apos;t rated any films yet
          </Title>
        </Box>
      </Center>
    </>
  )
}
