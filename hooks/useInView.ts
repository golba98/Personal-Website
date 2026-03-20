'use client'
import { useEffect, useRef, useState } from 'react'

export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: { threshold?: number; rootMargin?: string; once?: boolean } = {}
) {
  // rootMargin '0px 0px 150px 0px' expands the detection zone 150px *below*
  // the viewport — observer fires before the section is visible, so the
  // opacity/transform transition is already running when it scrolls into view.
  const { threshold = 0.08, rootMargin = '0px 0px 150px 0px', once = true } = options
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
        }
      },
      { threshold, rootMargin }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return { ref, inView }
}
