import { useCallback, useState } from 'react'

export const useFetching = (
  // eslint-disable-next-line @typescript-eslint/ban-types
  callback: Function
): [(...args: unknown[]) => Promise<void>, boolean, string | undefined] => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>()

  const fetching = useCallback(
    async (...args: unknown[]) => {
      try {
        setIsLoading(true)
        await callback(...args)
        setError(undefined)
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
