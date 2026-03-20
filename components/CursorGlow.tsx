'use client'

import { useEffect } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export default function CursorGlow() {
  // Use Motion Values for mouse position
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Apply a smooth spring to those values
  const springX = useSpring(mouseX, { stiffness: 80, damping: 30, mass: 0.5 })
  const springY = useSpring(mouseY, { stiffness: 80, damping: 30, mass: 0.5 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      // Offset by half of the glow's size (400px)
      mouseX.set(e.clientX - 400)
      mouseY.set(e.clientY - 400)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [mouseX, mouseY])

  return (
    <motion.div
      aria-hidden
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '800px',
        height: '800px',
        borderRadius: '50%',
        background:
          'radial-gradient(circle at center, rgba(110, 140, 220, 0.08) 0%, transparent 65%)',
        pointerEvents: 'none',
        zIndex: 0,
        x: springX,
        y: springY,
        willChange: 'transform',
      }}
    />
  )
}
