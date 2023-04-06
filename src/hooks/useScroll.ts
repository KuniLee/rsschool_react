import { useCallback, useEffect, useState } from 'react'

export default function useScroll(trig: boolean): boolean {
  const [scroll, setScroll] = useState(true)

  const disableScroll = useCallback(() => {
    const scrollTop = document.documentElement.scrollTop
    const scrollLeft = document.documentElement.scrollLeft

    window.onscroll = function () {
      window.scrollTo(scrollLeft, scrollTop)
    }
    setScroll(false)
  }, [])

  const enableScroll = useCallback(() => {
    window.onscroll = function () {}
    setScroll(true)
  }, [])

  useEffect(() => {
    if (trig) disableScroll()
    else enableScroll()
  }, [disableScroll, enableScroll, trig])

  return scroll
}
