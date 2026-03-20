'use client'

import { motion } from 'framer-motion'
import TextReveal from './TextReveal'

const skillGroups = [
  {
    label: 'Languages',
    skills: ['Python', 'JavaScript', 'PHP', 'Java', 'C#', 'C++', 'SQL'],
  },
  {
    label: 'Web',
    skills: ['HTML', 'CSS', 'React', 'Node.js'],
  },
  {
    label: 'Tools',
    skills: ['Git', 'Docker', 'Linux', 'VS Code', 'Unity', 'Unreal Engine'],
  },
  {
    label: 'Other',
    skills: ['AI/ML', 'Cybersecurity', 'Database design', 'Game Dev'],
  },
]

const containerVariants: import('framer-motion').Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants: import('framer-motion').Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 20 },
  },
}

export default function Skills() {
  return (
    <section className="pb-20">
      <TextReveal className="mb-8">
        <h2
          className="text-[0.75rem] text-[#888] uppercase tracking-[0.1em]"
          style={{ fontFamily: 'var(--font-dm-mono)' }}
        >
          — Skills
        </h2>
      </TextReveal>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="space-y-5"
      >
        {skillGroups.map((group) => (
          <motion.div
            key={group.label}
            variants={itemVariants}
            className="flex flex-wrap items-start gap-x-4 gap-y-3"
          >
            <span
              className="text-[0.75rem] text-[#888] pt-0.5 shrink-0"
              style={{ fontFamily: 'var(--font-dm-mono)', minWidth: '4rem' }}
            >
              {group.label}
            </span>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="skill-pill text-[0.75rem] text-[#f5f5f5] border border-[#222] px-3 py-1 cursor-default"
                  style={{ fontFamily: 'var(--font-dm-mono)' }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
