import { useCallback, useEffect, useState } from 'react'

export const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return width
}

export function useDimension(width: number): boolean {
  const [state, setState] = useState(false)

  const updateMobileState = useCallback(() => {
    const newMobile = window.innerWidth <= width
    if (newMobile !== state) {
      setState(newMobile)
    }
  }, [width, state])

  useEffect(() => {
    updateMobileState()

    window.addEventListener('resize', updateMobileState)

    return () => window.removeEventListener('resize', updateMobileState)
  }, [updateMobileState])

  return state
}

export { usePWAInstall } from './usePWAInstall'
export { useProximaConsulta } from './useProximaConsulta'

