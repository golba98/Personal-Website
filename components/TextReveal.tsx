'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface TextRevealProps {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
}

export default function TextReveal({ children, className, style }: TextRevealProps) {
  return (
    <div className={`overflow-hidden ${className}`} style={style}>
      <motion.div
        initial={{ y: '100%' }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
      >
        {children}
      </motion.div>
    </div>
  )
}
