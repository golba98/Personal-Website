'use client'

import { motion } from 'framer-motion'
import TextReveal from './TextReveal'

const entries = [
  {
    period: '2023 — present',
    organisation: 'University of London',
    role: 'BSc Computer Science',
    detail: 'Distance learning. Currently enrolled.',
    isLast: false,
  },
  {
    period: '2024',
    organisation: 'Pam Golding Properties',
    role: 'Part-time Intern',
    detail:
      'Photographed homes, prepared listings, inventory checking, property value estimation. Helped digitise and streamline property operations.',
    isLast: false,
  },
  {
    period: '2021 & 2023',
    organisation: 'Seasonal Hospitality',
    role: 'Summer Crew Member',
    detail:
      'Maintained guest areas during peak holiday periods. Led small team ensuring standards were met.',
    isLast: false,
  },
  {
    period: '2022',
    organisation: 'Restaurant',
    role: 'Part-time Waiter',
    detail:
      'High-pressure customer service environment. Improved communication, teamwork, and emotional resilience.',
    isLast: true,
  },
]

const containerVariants: import('framer-motion').Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants: import('framer-motion').Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 20 },
  },
}

export default function Experience() {
  return (
    <section className="pb-20">
      <TextReveal className="mb-8">
        <h2
          className="text-[0.75rem] text-[#888] uppercase tracking-[0.1em]"
          style={{ fontFamily: 'var(--font-dm-mono)' }}
        >
          — Experience
        </h2>
      </TextReveal>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {entries.map((entry, i) => (
          <motion.div key={i} variants={itemVariants} className="flex gap-5">
            {/* Timeline spine */}
            <div
              className="flex flex-col items-center"
              style={{ paddingTop: '4px' }}
            >
              {/* Dot */}
              <div
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: '#333',
                  flexShrink: 0,
                }}
              />
              {/* Vertical line */}
              {!entry.isLast && (
                <div
                  style={{
                    width: '1px',
                    flex: 1,
                    backgroundColor: '#1a1a1a',
                    marginTop: '6px',
                    minHeight: '2.5rem',
                  }}
                />
              )}
            </div>

            {/* Content */}
            <div style={{ paddingBottom: entry.isLast ? 0 : '2rem' }}>
              <p
                className="text-[0.72rem] text-[#444] mb-1"
                style={{ fontFamily: 'var(--font-dm-mono)' }}
              >
                {entry.period}
              </p>
              <p
                className="text-[0.9rem] text-[#f5f5f5]"
                style={{ fontFamily: 'var(--font-dm-mono)' }}
              >
                {entry.organisation}
              </p>
              <p
                className="text-[0.82rem] text-[#888] mt-0.5"
                style={{ fontFamily: 'var(--font-dm-sans)' }}
              >
                {entry.role}
              </p>
              {entry.detail && (
                <p
                  className="text-[0.8rem] text-[#444] mt-1.5 leading-relaxed"
                  style={{ fontFamily: 'var(--font-dm-sans)' }}
                >
                  {entry.detail}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
