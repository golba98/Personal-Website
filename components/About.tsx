'use client'

import type { CSSProperties } from 'react'
import { useInView } from '@/hooks/useInView'

export default function About() {
  const { ref, inView } = useInView<HTMLElement>()

  function fadeIn(delayMs: number): CSSProperties {
    return {
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(14px)',
      transition: `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms`,
      willChange: 'opacity, transform',
    }
  }

  return (
    <section ref={ref} className="pb-20">
      <h2
        className="text-[0.75rem] text-[#888] uppercase tracking-[0.1em] mb-8"
        style={{ fontFamily: 'var(--font-dm-mono)', ...fadeIn(0) }}
      >
        — About
      </h2>
      <div className="space-y-5">
        <p
          className="text-[0.95rem] text-[#ccc] leading-[1.8]"
          style={{ fontFamily: 'var(--font-dm-sans)', ...fadeIn(60) }}
        >
          I&apos;m a self-driven Computer Science student at the University of London,
          building real things while I study — from document automation tools and
          AI experiments to 3D games and point-of-sale systems.
        </p>
        <p
          className="text-[0.95rem] text-[#ccc] leading-[1.8]"
          style={{ fontFamily: 'var(--font-dm-sans)', ...fadeIn(120) }}
        >
          I work across the full stack, think in systems, and pick up new
          technologies fast. Currently focused on AI/ML, database engineering,
          and web development. I recently completed an internship at Pam Golding
          Properties where I helped digitize and streamline property operations.
        </p>
        <p
          className="text-[0.95rem] text-[#ccc] leading-[1.8]"
          style={{ fontFamily: 'var(--font-dm-sans)', ...fadeIn(180) }}
        >
          When I&apos;m not coding I&apos;m experimenting with local LLMs, optimizing
          hardware setups, or pulling apart how things work. I led my school&apos;s
          programming team, competed in the South African Mathematics Olympiad,
          and debated for five years — I like hard problems.
        </p>
      </div>
    </section>
  )
}
