'use client'

import { Group, Pagination as MantinePagination } from '@mantine/core'

export const Pagination = ({
  total,
  activePage,
  setActivePage,
}: {
  total: number
  activePage: number
  setActivePage: (activePage: number) => void
}) => {
  return (
    <MantinePagination.Root
      styles={{
        dots: {
          display: 'none',
        },
      }}
      boundaries={-1}
      value={activePage}
      onChange={(value) => setActivePage(value)}
      total={total}
    >
      <Group gap={8}>
        <MantinePagination.Previous />
        <MantinePagination.Items />
        <MantinePagination.Next />
      </Group>
    </MantinePagination.Root>
  )
}
