import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const useErrorRedirect = (isError: boolean) => {
  const router = useRouter()
  useEffect(() => {
    if (isError) {
      router.push('/not-found')
    }
  }, [isError])
}
