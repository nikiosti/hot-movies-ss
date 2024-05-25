'use client'
import { AppShell, Burger } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

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
      <AppShell.Navbar bg="purple.1" withBorder={false} p={24} zIndex={101}>
        <Navbar />
      </AppShell.Navbar>
      <AppShell.Main bg="grey.1">
        <Burger
          onClick={toggle}
          hiddenFrom="sm"
          style={{ zIndex: 201 }}
          pos="fixed"
          right={10}
          top={20}
          color="purple.5"
        />
        {children}
      </AppShell.Main>
    </AppShell>
  )
}

export default Layouyt
