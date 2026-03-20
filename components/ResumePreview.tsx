'use client'

import { motion } from 'framer-motion'
import TextReveal from './TextReveal'

export default function ResumePreview() {
  return (
    <section className="pb-20">
      <div className="flex items-center justify-between mb-8">
        <TextReveal>
          <h2
            className="text-[0.75rem] text-[#888] uppercase tracking-[0.1em]"
            style={{ fontFamily: 'var(--font-dm-mono)' }}
          >
            — Resume Preview
          </h2>
        </TextReveal>
        <a
          href="/api/cv"
          download="Jordan_Vorster_CV.pdf"
          className="text-[0.7rem] text-[#888] border border-[#1a1a1a] px-3 py-1.5 hover:border-[#333] hover:text-[#f5f5f5] transition-all duration-300"
          style={{ fontFamily: 'var(--font-dm-mono)' }}
        >
          Download PDF
        </a>
      </div>

      <div className="border border-[#1a1a1a] bg-[#0c0c0c]/50 p-6 md:p-10 space-y-10">
        {/* Header */}
        <div className="text-center space-y-2">
          <h3 className="text-xl text-[#f5f5f5] font-medium tracking-tight">Jordan L Vorster</h3>
          <p className="text-[0.8rem] text-[#555] font-mono">
            South Africa | +27 82 254 1235 | jordanvorster404@gmail.com
          </p>
        </div>

        {/* Profile */}
        <div className="grid md:grid-cols-[140px_1fr] gap-4 items-baseline">
          <span className="text-[0.7rem] uppercase tracking-widest text-[#444] font-mono">Profile</span>
          <p className="text-[0.9rem] text-[#888] leading-relaxed">
            Computer Science student with a solid technical background in Python, JavaScript, PHP, and Delphi.
            Experienced with full-stack concepts, algorithmic thinking, and efficient program design.
            Seeking internship opportunities to apply technical skills and collaborate on impactful projects.
          </p>
        </div>

        {/* Education */}
        <div className="grid md:grid-cols-[140px_1fr] gap-4 items-baseline">
          <span className="text-[0.7rem] uppercase tracking-widest text-[#444] font-mono">Education</span>
          <div>
            <h4 className="text-[0.95rem] text-[#f5f5f5] mb-1">Bachelor of Science, Computer Science</h4>
            <p className="text-[0.8rem] text-[#555] mb-2 font-mono italic">University of London — Currently Enrolled</p>
            <ul className="text-[0.85rem] text-[#888] list-disc list-inside space-y-1">
              <li>Expected to complete degree through UoL global learning program.</li>
              <li>Focus on software engineering, data structures, and algorithms.</li>
            </ul>
          </div>
        </div>

        {/* Experience */}
        <div className="grid md:grid-cols-[140px_1fr] gap-4 items-baseline">
          <span className="text-[0.7rem] uppercase tracking-widest text-[#444] font-mono">Experience</span>
          <div className="space-y-6">
            <div>
              <h4 className="text-[0.9rem] text-[#f5f5f5]">Pam Golding Properties</h4>
              <p className="text-[0.75rem] text-[#555] mb-2 font-mono">Part-time Intern — 2024</p>
              <p className="text-[0.85rem] text-[#888]">Assisted with property photography, documentation, and troubleshooting operations.</p>
            </div>
            <div>
              <h4 className="text-[0.9rem] text-[#f5f5f5]">Summer Crew Member</h4>
              <p className="text-[0.75rem] text-[#555] mb-2 font-mono">2021 & 2023</p>
              <p className="text-[0.85rem] text-[#888]">Maintained guest areas and led a small team during peak holiday periods.</p>
            </div>
          </div>
        </div>

        {/* Certifications */}
        <div className="grid md:grid-cols-[140px_1fr] gap-4 items-baseline">
          <span className="text-[0.7rem] uppercase tracking-widest text-[#444] font-mono">Certifications</span>
          <div className="space-y-3">
            <p className="text-[0.85rem] text-[#888]">
              <span className="text-[#f5f5f5]">CS50: Intro to Computer Science</span> — Harvard University (edX)
            </p>
            <p className="text-[0.85rem] text-[#888]">
              <span className="text-[#f5f5f5]">Cloud Computing / Calculus Fundamentals</span> — Coursera
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
