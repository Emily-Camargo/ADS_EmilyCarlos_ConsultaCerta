declare module 'react-awesome-lightbox' {
  import React from 'react'

  export interface LightboxImage {
    url: string
    title?: string
  }

  interface LightboxProps {
    image?: string
    title?: string
    images?: LightboxImage[]
    startIndex?: number
    onClose?: (event: React.MouseEvent<HTMLDivElement>) => void
    zoomStep?: number
    doubleClickZoom?: number
    allowZoom?: boolean
    allowRotate?: boolean
    allowReset?: boolean
    keyboardInteraction?: boolean
    showTitle?: boolean
    buttonAlign?: 'flex-start' | 'center' | 'flex-end'
  }

  const Lightbox: React.FC<LightboxProps>
  export default Lightbox
}
