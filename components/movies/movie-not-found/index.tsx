'use client'

import { Box, Center, Image, Title } from '@mantine/core'

export const MovieNotFound = () => {
  return (
    <Box pos="absolute" style={{ transform: 'translate(-50%, -50%)' }} left="50%" top="50%">
      <Center>
        <Image src="/notfound.png" w={233} alt="notfound image" />
      </Center>
      <Title w={'100%'} ta="center" lh="normal" fw={600} fz={20} fs="normal" order={3}>
        We don&apos;t have such movies, look for another one
      </Title>
    </Box>
  )
}
