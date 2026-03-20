'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const containerVariants: import('framer-motion').Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants: import('framer-motion').Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: 'spring', stiffness: 100, damping: 20 } 
  },
}

export default function Hero() {
  const githubUsername = process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? 'golba98'
  const h1Ref = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const INTERVAL = 7000   // ms between bursts
    const DURATION = 500    // ms the glitch-active class is held

    const trigger = () => {
      const el = h1Ref.current
      if (!el) return
      el.classList.add('glitch-active')
      setTimeout(() => el.classList.remove('glitch-active'), DURATION)
    }

    const id = setInterval(trigger, INTERVAL)
    return () => clearInterval(id)
  }, [])

  return (
    <motion.section 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="py-24"
    >
      <motion.h1
        variants={itemVariants}
        ref={h1Ref}
        className="glitch text-[3.5rem] font-light text-[#f5f5f5] leading-none mb-5"
        style={{ fontFamily: 'var(--font-dm-sans)' }}
        data-text="Jordan Vorster"
      >
        Jordan Vorster
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="text-[1rem] text-[#f5f5f5] mb-2"
        style={{ fontFamily: 'var(--font-dm-mono)' }}
      >
        CS Student &amp; Developer
      </motion.p>

      <motion.p
        variants={itemVariants}
        className="text-[0.85rem] text-[#888] mb-2"
        style={{ fontFamily: 'var(--font-dm-mono)' }}
      >
        University of London BSc · Eastern Cape, South Africa
      </motion.p>

      <motion.p
        variants={itemVariants}
        className="text-[0.85rem] text-[#555] mb-6"
        style={{ fontFamily: 'var(--font-dm-mono)' }}
      >
        Open to internships &amp; junior roles · Available remotely
      </motion.p>

      <motion.div variants={itemVariants} className="flex items-center gap-2 mb-10">
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: '#22c55e',
            flexShrink: 0,
            animation: 'pulse-dot 1.8s ease-in-out infinite',
          }}
        />
        <span
          className="text-[0.75rem] text-[#555]"
          style={{ fontFamily: 'var(--font-dm-mono)' }}
        >
          Available for opportunities
        </span>
      </motion.div>

      <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
        <a
          href="/api/cv"
          download="Jordan_Vorster_CV.pdf"
          className="text-[0.75rem] text-[#888] border border-[#1a1a1a] px-3 py-1.5 transition-colors duration-150 ease-in hover:border-[#555] hover:text-[#f5f5f5]"
          style={{ fontFamily: 'var(--font-dm-mono)' }}
        >
          ↓ Download CV
        </a>
        <a
          href={`https://github.com/${githubUsername}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[0.75rem] text-[#888] border border-[#1a1a1a] px-3 py-1.5 transition-colors duration-150 ease-in hover:border-[#555] hover:text-[#f5f5f5]"
          style={{ fontFamily: 'var(--font-dm-mono)' }}
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/jordan-vorster-49464122b/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[0.75rem] text-[#888] border border-[#1a1a1a] px-3 py-1.5 transition-colors duration-150 ease-in hover:border-[#555] hover:text-[#f5f5f5]"
          style={{ fontFamily: 'var(--font-dm-mono)' }}
        >
          LinkedIn
        </a>
        <a
          href="mailto:jordanvorster404@gmail.com"
          className="text-[0.75rem] text-[#888] border border-[#1a1a1a] px-3 py-1.5 transition-colors duration-150 ease-in hover:border-[#555] hover:text-[#f5f5f5]"
          style={{ fontFamily: 'var(--font-dm-mono)' }}
        >
          Email
        </a>
      </motion.div>
    </motion.section>
  )
}
