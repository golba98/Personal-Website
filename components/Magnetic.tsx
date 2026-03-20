'use client'

import { useRef, useState, ReactNode } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'

interface MagneticProps {
  children: ReactNode
}

export default function Magnetic({ children }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  // Create smooth springs for the x and y offsets
  const x = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 })
  const y = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e
    const { height, width, left, top } = ref.current!.getBoundingClientRect()
    
    // Calculate the distance of the mouse from the center of the element
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    
    // Set the springs to the calculated offset
    x.set(middleX * 0.35)
    y.set(middleY * 0.35)
  }

  const handleMouseLeave = () => {
    // Reset springs to 0 when mouse leaves
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      style={{ x, y }}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  )
}
