import { Group, Paper, SimpleGrid, Skeleton, Stack } from '@mantine/core'
import { IconStar } from '@/ui'

export const MoviesSkeleton = ({ count }: { count: number }) => {
  return (
    <SimpleGrid cols={{ base: 1, xl: 2 }} spacing={16} verticalSpacing={16} w="100%">
      {Array(count)
        .fill(0)
        .map((_, i) => (
          <Paper p={24} radius={12} key={i}>
            <Group gap={16} wrap="nowrap" justify="space-between" align="flex-start">
              <Group w={390} h={170} gap={16} wrap="nowrap" align="flex-start">
                <Skeleton w={119} h={170} />
                <Stack w={263} justify="space-between" h="100%">
                  <div>
                    <Skeleton height={15} w="70%" mt={6} radius="xl" />
                    <Skeleton height={8} w="20%" mt={6} radius="xl" />
                    <Skeleton height={8} w="70%" mt={6} radius="xl" />
                    <Skeleton height={8} w="70%" mt={6} radius="xl" />
                    <Skeleton height={8} w="30%" mt={6} radius="xl" />
                  </div>
                  <div>
                    <Skeleton height={10} w="70%" mt={6} radius="xl" />
                    <Skeleton height={10} w="70%" mt={6} radius="xl" />
                  </div>
                </Stack>
              </Group>
              <IconStar style={{ fill: 'var(--mantine-color-grey-2)', stroke: 'var(--mantine-color-grey-2)' }} />
            </Group>
          </Paper>
        ))}
    </SimpleGrid>
  )
}
