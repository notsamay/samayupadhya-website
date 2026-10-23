import { useEffect, useState } from 'react'

// Header sits invisibly over the hero at the top of the page, slides away
// while scrolling down, and pops back (as a solid bar) when scrolling up.
export function useScrollHeader() {
  const [state, setState] = useState({ atTop: true, hidden: false })
  useEffect(() => {
    let lastY = window.scrollY
    function onScroll() {
      const y = window.scrollY
      if (Math.abs(y - lastY) < 4) return
      setState({ atTop: y < 8, hidden: y > lastY && y > 80 })
      lastY = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return state
}
