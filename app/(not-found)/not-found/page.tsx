'use client'
import { LogotypeWithTitle } from '@/ui/logotype/logotype'
import { Box, Button, Center, Container, Image, Title } from '@mantine/core'
import { useRouter } from 'next/navigation'

const Page = () => {
  const router = useRouter()
  return (
    <div>
      <Box mt={24} ml={24} pos="absolute">
        <LogotypeWithTitle />
      </Box>
      <Center h="100vh" bg="grey.1">
        <div>
          <Image src="/404.png" maw={656} mah={196} w="100%"></Image>
          <Title ta="center" lh="normal" fw={600} fz={20} fs="normal" order={3} mt={48}>
            We can&apos;t find the page you are looking for
          </Title>
          <Center>
            <Button color="purple.5" mt={16} radius={8} onClick={() => router.push('/')}>
              Go Home
            </Button>
          </Center>
        </div>
      </Center>
    </div>
  )
}

export default Page
