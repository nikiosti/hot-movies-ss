'use client'
import { notFound } from 'next/navigation'
import { useEffect } from 'react'

export const useErrorRedirect = (isError: boolean) => {
  useEffect(() => {
    if (isError) {
      notFound()
    }
  }, [isError])
}
