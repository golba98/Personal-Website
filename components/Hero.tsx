'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Magnetic from './Magnetic'

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
  const [copied, setCopied] = useState(false)

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

  const copyEmail = () => {
    navigator.clipboard.writeText('jordanvorster404@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

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
        <Magnetic>
          <a
            href="/api/cv"
            download="Jordan_Vorster_CV.pdf"
            className="text-[0.75rem] text-[#888] border border-[#1a1a1a] px-3 py-1.5 transition-colors duration-150 ease-in hover:border-[#555] hover:text-[#f5f5f5] block"
            style={{ fontFamily: 'var(--font-dm-mono)' }}
          >
            ↓ Download CV
          </a>
        </Magnetic>
        <Magnetic>
          <a
            href={`https://github.com/${githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.75rem] text-[#888] border border-[#1a1a1a] px-3 py-1.5 transition-colors duration-150 ease-in hover:border-[#555] hover:text-[#f5f5f5] block"
            style={{ fontFamily: 'var(--font-dm-mono)' }}
          >
            GitHub
          </a>
        </Magnetic>
        <Magnetic>
          <a
            href="https://www.linkedin.com/in/jordan-vorster-49464122b/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.75rem] text-[#888] border border-[#1a1a1a] px-3 py-1.5 transition-colors duration-150 ease-in hover:border-[#555] hover:text-[#f5f5f5] block"
            style={{ fontFamily: 'var(--font-dm-mono)' }}
          >
            LinkedIn
          </a>
        </Magnetic>
        <Magnetic>
          <button
            onClick={copyEmail}
            className="relative text-[0.75rem] text-[#888] border border-[#1a1a1a] px-3 py-1.5 transition-colors duration-150 ease-in hover:border-[#555] hover:text-[#f5f5f5] block min-w-[100px]"
            style={{ fontFamily: 'var(--font-dm-mono)' }}
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.span
                  key="copied"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                >
                  Copied!
                </motion.span>
              ) : (
                <motion.span
                  key="email"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                >
                  Email
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </Magnetic>
      </motion.div>
    </motion.section>
  )
}
