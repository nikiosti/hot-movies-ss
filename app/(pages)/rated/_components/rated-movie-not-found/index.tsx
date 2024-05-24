'use client'

import { Box, Button, Center, Image, Title } from '@mantine/core'
import { useRouter } from 'next/navigation'

export const RatedMovieNotFound = () => {
  const router = useRouter()
  return (
    <>
      <Center h="100vh">
        <Box>
          <Center>
            <Image src="/empty-rated.png" w={311} alt="notfound image" />
          </Center>
          <Title ta="center" lh="normal" fw={600} fz={20} fs="normal" order={3} mt={16}>
            You haven&apos;t rated any films yet
          </Title>
          <Center>
            <Button color="purple.5" radius={8} mt={16} onClick={() => router.push('/')}>
              Find movies
            </Button>
          </Center>
        </Box>
      </Center>
    </>
  )
}
