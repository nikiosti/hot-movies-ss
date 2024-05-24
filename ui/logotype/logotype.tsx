'use client'
import { Group, Title, UnstyledButton } from '@mantine/core'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export const LogotypeWithTitle = () => {
  const router = useRouter()
  return (
    <UnstyledButton onClick={() => router.push('/')}>
      <Group h={36} gap={12}>
        <Image src="/logotype-small.svg" width={32} height={32} alt="ArrowFlicks logotype" />
        <Title fw={600} fz={24} c="purple.5" ff="Poppins, sans-serif" fs="normal" lts={-0.48} lh="normal">
          ArrowFlicks
        </Title>
      </Group>
    </UnstyledButton>
  )
}
