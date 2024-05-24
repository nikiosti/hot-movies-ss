import { Group, Title } from '@mantine/core'
import Image from 'next/image'

export const LogotypeWithTitle = () => {
  return (
    <Group h={36} gap={12}>
      <Image src="/logotype-small.svg" width={32} height={32} alt="ArrowFlicks logotype" />
      <Title fw={600} fz={24} c="purple.5" ff="Poppins, sans-serif" fs="normal" lts={-0.48} lh="normal">
        ArrowFlicks
      </Title>
    </Group>
  )
}
