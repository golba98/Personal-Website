'use client'

import { motion } from 'framer-motion'
import TextReveal from './TextReveal'

export default function About() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="pb-20"
    >
      <TextReveal className="mb-8">
        <h2
          className="text-[0.75rem] text-[#888] uppercase tracking-[0.1em]"
          style={{ fontFamily: 'var(--font-dm-mono)' }}
        >
          — About
        </h2>
      </TextReveal>
      <div className="space-y-5">
        <p
          className="text-[0.95rem] text-[#ccc] leading-[1.8]"
          style={{ fontFamily: 'var(--font-dm-sans)' }}
        >
          I&apos;m a self-driven Computer Science student at the University of London,
          building real things while I study — from document automation tools and
          AI experiments to 3D games and point-of-sale systems.
        </p>
        <p
          className="text-[0.95rem] text-[#ccc] leading-[1.8]"
          style={{ fontFamily: 'var(--font-dm-sans)' }}
        >
          I work across the full stack, think in systems, and pick up new
          technologies fast. Currently focused on AI/ML, database engineering,
          and web development. I recently completed an internship at Pam Golding
          Properties where I helped digitize and streamline property operations.
        </p>
        <p
          className="text-[0.95rem] text-[#ccc] leading-[1.8]"
          style={{ fontFamily: 'var(--font-dm-sans)' }}
        >
          When I&apos;m not coding I&apos;m experimenting with local LLMs, optimizing
          hardware setups, or pulling apart how things work. I led my school&apos;s
          programming team, competed in the South African Mathematics Olympiad,
          and debated for five years — I like hard problems.
        </p>
      </div>
    </motion.section>
  )
}
