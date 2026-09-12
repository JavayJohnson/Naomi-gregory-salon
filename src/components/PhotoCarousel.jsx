import { useCallback, useEffect, useRef, useState } from 'react'

const AUTOPLAY_DELAY = 5000

function useReducedMotion() {
  const [reduced, setReduced] = useState(() => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false)
  useEffect(() => {
    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    if (!media) return undefined
    const update = () => setReduced(media.matches)
    media.addEventListener?.('change', update)
    return () => media.removeEventListener?.('change', update)
  }, [])
  return reduced
}

export default function PhotoCarousel({ photos }) {
  const viewportRef = useRef(null)
  const [index, setIndex] = useState(0)
  const [interactionPaused, setInteractionPaused] = useState(false)
  const reducedMotion = useReducedMotion()
  const paused = interactionPaused || reducedMotion

  const moveTo = useCallback((nextIndex) => {
    const normalized = (nextIndex + photos.length) % photos.length
    const firstSlide = viewportRef.current?.querySelector('[data-carousel-slide]')
    const gap = parseFloat(getComputedStyle(viewportRef.current).columnGap || '0')
    const left = firstSlide ? normalized * (firstSlide.getBoundingClientRect().width + gap) : 0
    viewportRef.current?.scrollTo({ left, behavior: reducedMotion ? 'auto' : 'smooth' })
    setIndex(normalized)
  }, [photos.length, reducedMotion])

  useEffect(() => {
    if (paused) return undefined
    const timer = window.setInterval(() => moveTo(index + 1), AUTOPLAY_DELAY)
    return () => window.clearInterval(timer)
  }, [index, moveTo, paused])

  return (
    <section
      className="carousel"
      aria-roledescription="carousel"
      aria-label="Hairstyle photos"
      onMouseEnter={() => setInteractionPaused(true)}
      onMouseLeave={() => setInteractionPaused(false)}
      onFocusCapture={() => setInteractionPaused(true)}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setInteractionPaused(false) }}
    >
      <div ref={viewportRef} className="carousel-viewport">
        {photos.map((photo, photoIndex) => (
          <div className="carousel-slide" data-carousel-slide key={photo.id} role="group" aria-roledescription="slide" aria-label={`${photoIndex + 1} of ${photos.length}`}>
            <img src={photo.sources[photo.selected]} alt={photo.alt} loading={photoIndex < 3 ? 'eager' : 'lazy'} />
          </div>
        ))}
      </div>
      <p className="sr-only" aria-live="off">Photo {index + 1} of {photos.length}</p>
    </section>
  )
}
