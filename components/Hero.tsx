import type { CSSProperties } from 'react'

/** fadeUp — used for everything below the h1 */
function fadeUp(delayMs: number): CSSProperties {
  return {
    opacity: 0,
    animation: `fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms forwards`,
  }
}

export default function Hero() {
  const githubUsername = process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? 'golba98'

  return (
    <section className="py-24">
      {/*
        LCP element — rendered at full opacity immediately so the browser
        can register it as painted. Uses slideUp (transform only) so it
        still has the entrance motion without the opacity-0 LCP penalty.
      */}
      <h1
        className="text-[3.5rem] font-light text-[#f5f5f5] leading-none mb-5"
        style={{
          fontFamily: 'var(--font-dm-sans)',
          animation: 'slideUp 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        }}
      >
        Jordan Vorster
      </h1>

      {/* Role */}
      <p
        className="text-[1rem] text-[#f5f5f5] mb-2"
        style={{ fontFamily: 'var(--font-dm-mono)', ...fadeUp(80) }}
      >
        CS Student &amp; Developer
      </p>

      {/* Location */}
      <p
        className="text-[0.85rem] text-[#888] mb-2"
        style={{ fontFamily: 'var(--font-dm-mono)', ...fadeUp(160) }}
      >
        University of London BSc · Eastern Cape, South Africa
      </p>

      {/* Availability text */}
      <p
        className="text-[0.85rem] text-[#555] mb-6"
        style={{ fontFamily: 'var(--font-dm-mono)', ...fadeUp(240) }}
      >
        Open to internships &amp; junior roles · Available remotely
      </p>

      {/* Availability badge */}
      <div className="flex items-center gap-2 mb-10" style={fadeUp(300)}>
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
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3" style={fadeUp(360)}>
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
      </div>
    </section>
  )
}
