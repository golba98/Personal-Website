'use client'

import type { CSSProperties } from 'react'
import { useInView } from '@/hooks/useInView'

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

export default function Skills() {
  const { ref, inView } = useInView<HTMLElement>()

  function fadeIn(delayMs: number): CSSProperties {
    return {
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(14px)',
      transition: `opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, transform 0.65s cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms`,
    }
  }

  let pillIndex = 0

  return (
    <section ref={ref} className="pb-20">
      <h2
        className="text-[0.75rem] text-[#888] uppercase tracking-[0.1em] mb-8"
        style={{ fontFamily: 'var(--font-dm-mono)', ...fadeIn(0) }}
      >
        — Skills
      </h2>
      <div className="space-y-5">
        {skillGroups.map((group) => (
          <div key={group.label} className="flex flex-wrap items-start gap-x-4 gap-y-3">
            <span
              className="text-[0.75rem] text-[#888] pt-0.5 shrink-0"
              style={{ fontFamily: 'var(--font-dm-mono)', minWidth: '4rem' }}
            >
              {group.label}
            </span>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => {
                const delay = 40 + pillIndex++ * 20
                return (
                  <span
                    key={skill}
                    className="skill-pill text-[0.75rem] text-[#f5f5f5] border border-[#222] px-3 py-1 cursor-default"
                    style={{ fontFamily: 'var(--font-dm-mono)', ...fadeIn(delay) }}
                  >
                    {skill}
                  </span>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
