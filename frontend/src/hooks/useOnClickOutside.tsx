import { RefObject, useEffect } from 'react'

export default function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: Event) => void
) {
  useEffect(() => {
    const listener = (event: Event) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return
      }
      handler(event)
    }

    document.addEventListener('click', listener, true)
    document.addEventListener('touchstart', listener)
    return () => {
      document.removeEventListener('click', listener, true)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}
