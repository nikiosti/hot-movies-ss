'use client'
import { LogotypeWithTitle } from '../logotype/logotype'
import { Box, NavLink } from '@mantine/core'
import { usePathname, useRouter } from 'next/navigation'

import classes from './index.module.css'

export const Navbar = () => {
  const navData = [
    {
      label: 'Movies',
      href: '/',
      isActive: () => usePathname() === '/',
    },

    {
      label: 'Rated movies',
      href: '/rated',
      isActive: () => usePathname() === '/rated',
    },
  ]

  const router = useRouter()
  return (
    <>
      <LogotypeWithTitle />
      <Box mt={80}>
        {navData.map((nav) => (
          <NavLink
            key={nav.href}
            active={nav.isActive()}
            label={nav.label}
            onClick={() => router.push(nav.href)}
            classNames={{
              root: classes.root,
            }}
          />
        ))}
      </Box>
    </>
  )
}
