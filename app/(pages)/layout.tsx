'use client'
import { AppShell, Box, Group, NavLink } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { LogotypeWithTitle } from '@/ui/logotype/logotype'

import { usePathname, useRouter } from 'next/navigation'
import { Navbar } from '@/ui'

const Layouyt = ({ children }: { children: React.ReactNode }) => {
  //TODO: MOBILE
  const [opened, { toggle }] = useDisclosure()

  return (
    <AppShell
      navbar={{
        width: 280,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
    >
      <AppShell.Navbar bg="purple.1" withBorder={false} p={24}>
        <Navbar />
      </AppShell.Navbar>
      <AppShell.Main bg="grey.1">{children}</AppShell.Main>
    </AppShell>
  )
}

export default Layouyt
