'use client'

import { Breadcrumbs as BreadcrumbsMantine } from '@mantine/core'
import Link from 'next/link'

import classes from './index.module.css'
export const Breadcrumbs = ({ originalTitle }: { originalTitle: string | undefined }) => {
  const items = [
    { title: 'Movies', href: '/' },
    { title: originalTitle, href: '' },
  ].map((item, index) => (
    <Link href={item.href} key={index}>
      {item.title}
    </Link>
  ))

  return <BreadcrumbsMantine className={classes.breadcrumbs}>{items}</BreadcrumbsMantine>
}
