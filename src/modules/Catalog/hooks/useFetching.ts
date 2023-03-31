import { useCallback, useState } from 'react'

// eslint-disable-next-line @typescript-eslint/ban-types
export const useFetching = (callback: Function): [(...args: unknown[]) => Promise<void>, boolean, string] => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const fetching = useCallback(
    async (...args: unknown[]) => {
      try {
        setIsLoading(true)
        await callback(...args)
      } catch (e) {
        if (e instanceof Error) setError(e.message)
      } finally {
        setIsLoading(false)
      }
    },
    [callback]
  )
  return [fetching, isLoading, error]
}
