'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useInView } from '@/hooks/useInView'
import type { Repo } from '@/types'

// ─── Language colours ────────────────────────────────────────────
const languageColors: Record<string, string> = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  Python:     '#3572a5',
  HTML:       '#e34c26',
  CSS:        '#563d7c',
  Shell:      '#89e051',
  'C#':       '#178600',
}
function langColor(lang: string | null) { return lang ? (languageColors[lang] ?? '#555') : '#555' }

// ─── Hardcoded featured projects ────────────────────────────────
const githubBase = `https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? 'golba98'}`

type PreviewVariant = 'bars' | 'grid' | 'terminal'

interface Featured {
  index: string
  name: string
  description: string
  tech: string[]
  year: string
  type: string
  github: string
  preview: PreviewVariant
}

const featured: Featured[] = [
  {
    index: '01',
    name: 'TryPOS',
    description:
      'Functional point-of-sale system built for school event stalls. Inventory tracking, sales processing, and receipt generation.',
    tech: ['Python', 'SQL', 'CSS'],
    year: '2023',
    type: 'Web App',
    github: `${githubBase}/TryPOS`,
    preview: 'bars',
  },
  {
    index: '02',
    name: 'GeoQuest 3D',
    description:
      '3D geo-guesser style game with interactive world exploration and location-based scoring mechanics.',
    tech: ['C#', 'Unity'],
    year: '2024',
    type: 'Game',
    github: `${githubBase}/GeoQuest`,
    preview: 'grid',
  },
  {
    index: '03',
    name: 'RugbyMate',
    description:
      'Event-management program for organising and running school rugby tournaments, fixtures, and results.',
    tech: ['Python', 'SQL'],
    year: '2023',
    type: 'Tool',
    github: `${githubBase}/RugbyMate`,
    preview: 'terminal',
  },
]

// ─── Abstract CSS preview panels ────────────────────────────────
function PreviewBars() {
  const rows = [
    { w: '72%', c: '#222' },
    { w: '48%', c: '#1a1a1a' },
    { w: '85%', c: '#222' },
    { w: '38%', c: '#1a1a1a' },
    { w: '60%', c: '#222' },
  ]
  return (
    <div
      className="border border-[#1a1a1a] flex flex-col gap-2 p-4"
      style={{ backgroundColor: '#0a0a0a', minHeight: '120px', justifyContent: 'center' }}
    >
      <div style={{ height: '1px', backgroundColor: '#1a1a1a', marginBottom: '6px' }} />
      {rows.map((r, i) => (
        <div key={i} className="flex items-center gap-2">
          <div style={{ width: r.w, height: '6px', backgroundColor: r.c, borderRadius: '1px' }} />
        </div>
      ))}
    </div>
  )
}

function PreviewGrid() {
  const cells = [1,0,0,1,0,1,0,0,1,0,1,0,0,1,0,1,0,0,1,0,1,0,1,0,0]
  return (
    <div
      className="border border-[#1a1a1a] flex items-center justify-center p-4"
      style={{ backgroundColor: '#0a0a0a', minHeight: '120px' }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '6px' }}>
        {cells.map((on, i) => (
          <div
            key={i}
            style={{
              width: '8px', height: '8px', borderRadius: '50%',
              backgroundColor: on ? '#333' : '#1a1a1a',
            }}
          />
        ))}
      </div>
    </div>
  )
}

function PreviewTerminal() {
  const lines = ['> init tournament', '  loading fixtures...', '  4 teams · 6 matches', '> running...', '  ✓ complete']
  return (
    <div
      className="border border-[#1a1a1a] p-4"
      style={{ backgroundColor: '#0a0a0a', minHeight: '120px' }}
    >
      <div className="flex gap-1.5 mb-3">
        {['#333','#222','#1a1a1a'].map((c,i) => (
          <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: c }} />
        ))}
      </div>
      {lines.map((l, i) => (
        <p key={i} className="text-[0.6rem] text-[#444] leading-[1.8]"
           style={{ fontFamily: 'var(--font-dm-mono)' }}>
          {l}
        </p>
      ))}
    </div>
  )
}

const previews: Record<PreviewVariant, () => JSX.Element> = {
  bars:     PreviewBars,
  grid:     PreviewGrid,
  terminal: PreviewTerminal,
}

// ─── Skeleton ───────────────────────────────────────────────────
function SkeletonCard() {
  return <div className="border border-[#1a1a1a] bg-[#1a1a1a] animate-pulse h-28" />
}

// ─── Main component ─────────────────────────────────────────────
export default function Projects() {
  const { data: session } = useSession()
  const { ref, inView } = useInView<HTMLElement>()

  const [repos, setRepos]         = useState<Repo[]>([])
  const [loading, setLoading]     = useState(true)
  const [showForks, setShowForks] = useState(false)
  const [filter, setFilter]       = useState<string>('All')
  const [error, setError]         = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetch('/api/repos')
      .then(r => { if (!r.ok) throw new Error(); return r.json() })
      .then((data: Repo[]) => { setRepos(data); setLoading(false) })
      .catch(() => { setError('Could not load repositories.'); setLoading(false) })
  }, [session])

  // Build filter tab list from repo languages
  const allLangs = Array.from(new Set(repos.map(r => r.language).filter(Boolean))) as string[]
  const tabs = ['All', ...allLangs.slice(0, 5)]

  const filtered = repos
    .filter(r => showForks || !r.fork)
    .filter(r => filter === 'All' || r.language === filter)

  const isAuthenticated = !!session

  return (
    <section ref={ref} className="pb-20">

      {/* ── Section label ── */}
      <div className="flex items-center justify-between mb-10">
        <h2
          className="text-[0.75rem] text-[#888] uppercase tracking-[0.1em]"
          style={{ fontFamily: 'var(--font-dm-mono)' }}
        >
          — Projects{' '}
          <span className="normal-case">
            {isAuthenticated ? '(public + private)' : '(public)'}
          </span>
        </h2>
        {isAuthenticated && (
          <button
            onClick={() => setShowForks(v => !v)}
            className="text-[0.7rem] text-[#555] border border-[#1a1a1a] px-2.5 py-1 transition-colors duration-150 hover:border-[#333] hover:text-[#888]"
            style={{ fontFamily: 'var(--font-dm-mono)' }}
          >
            {showForks ? 'hide forks' : 'include forks'}
          </button>
        )}
      </div>

      {/* ── Featured pinned ── */}
      <div className="flex flex-col gap-4 mb-14">
        {featured.map((p) => {
          const Preview = previews[p.preview]
          return (
            <a
              key={p.index}
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group border border-[#1a1a1a] bg-[#0f0f0f] p-6 flex flex-col sm:flex-row gap-6 hover:border-[#333] transition-colors duration-150"
            >
              {/* Left — content */}
              <div className="flex-1 min-w-0 flex flex-col justify-between gap-4">
                <div>
                  {/* Index + type badge row */}
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="text-[0.65rem] text-[#333]"
                      style={{ fontFamily: 'var(--font-dm-mono)' }}
                    >
                      {p.index}
                    </span>
                    <span
                      className="text-[0.6rem] text-[#444] border border-[#1a1a1a] px-1.5 py-0.5"
                      style={{ fontFamily: 'var(--font-dm-mono)' }}
                    >
                      {p.type}
                    </span>
                    <span
                      className="text-[0.6rem] text-[#333]"
                      style={{ fontFamily: 'var(--font-dm-mono)' }}
                    >
                      {p.year}
                    </span>
                  </div>

                  {/* Name */}
                  <h3
                    className="text-[1rem] text-[#f5f5f5] mb-2 group-hover:text-white transition-colors duration-150"
                    style={{ fontFamily: 'var(--font-dm-mono)' }}
                  >
                    {p.name}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-[0.85rem] text-[#888] leading-relaxed"
                    style={{ fontFamily: 'var(--font-dm-sans)' }}
                  >
                    {p.description}
                  </p>
                </div>

                {/* Tech stack + link */}
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex flex-wrap gap-2">
                    {p.tech.map(t => (
                      <span key={t} className="flex items-center gap-1.5">
                        <span
                          style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: langColor(t), flexShrink: 0 }}
                        />
                        <span
                          className="text-[0.72rem] text-[#555]"
                          style={{ fontFamily: 'var(--font-dm-mono)' }}
                        >
                          {t}
                        </span>
                      </span>
                    ))}
                  </div>
                  <span
                    className="text-[0.7rem] text-[#333] group-hover:text-[#555] transition-colors duration-150"
                    style={{ fontFamily: 'var(--font-dm-mono)' }}
                  >
                    ↗ View repo
                  </span>
                </div>
              </div>

              {/* Right — abstract preview (hidden on mobile) */}
              <div className="hidden sm:block w-[180px] shrink-0">
                <Preview />
              </div>
            </a>
          )
        })}
      </div>

      {/* ── Repositories heading + filter ── */}
      <div className="mb-6">
        <p
          className="text-[0.75rem] text-[#444] uppercase tracking-[0.1em] mb-4"
          style={{ fontFamily: 'var(--font-dm-mono)' }}
        >
          — Repositories
        </p>

        {/* Language filter tabs */}
        {!loading && tabs.length > 1 && (
          <div className="flex flex-wrap gap-1">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className="text-[0.7rem] px-2.5 py-1 border transition-colors duration-150"
                style={{
                  fontFamily: 'var(--font-dm-mono)',
                  borderColor: filter === tab ? '#555' : '#1a1a1a',
                  color:       filter === tab ? '#f5f5f5' : '#555',
                }}
              >
                {tab === 'All' ? 'All' : (
                  <span className="flex items-center gap-1.5">
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: langColor(tab), display: 'inline-block' }} />
                    {tab}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <p className="text-[0.8rem] text-[#444] mb-6" style={{ fontFamily: 'var(--font-dm-mono)' }}>
          {error}
        </p>
      )}

      {/* ── Repos grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : filtered.map((repo, index) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                data-inview={String(inView)}
                className="group project-card border border-[#1a1a1a] bg-[#0f0f0f] px-5 py-4 flex flex-col gap-2 hover:border-[#2a2a2a]"
                style={{ transitionDelay: `${index * 35}ms` }}
              >
                {/* Title row */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <h3
                      className="text-[0.85rem] text-[#f5f5f5] truncate"
                      style={{ fontFamily: 'var(--font-dm-mono)' }}
                    >
                      {repo.name}
                    </h3>
                    {repo.private && (
                      <span
                        className="text-[0.55rem] text-[#333] border border-[#1a1a1a] px-1.5 py-0.5 shrink-0"
                        style={{ fontFamily: 'var(--font-dm-mono)' }}
                      >
                        private
                      </span>
                    )}
                  </div>
                  <span
                    className="text-[0.65rem] text-[#333] opacity-0 group-hover:opacity-100 transition-opacity duration-150 shrink-0"
                    style={{ fontFamily: 'var(--font-dm-mono)' }}
                  >
                    ↗
                  </span>
                </div>

                {/* Description */}
                {repo.description && (
                  <p
                    className="text-[0.8rem] text-[#555] leading-relaxed line-clamp-1"
                    style={{ fontFamily: 'var(--font-dm-sans)' }}
                  >
                    {repo.description}
                  </p>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between mt-auto pt-1">
                  {repo.language ? (
                    <span className="flex items-center gap-1.5">
                      <span
                        style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: langColor(repo.language), flexShrink: 0 }}
                      />
                      <span
                        className="text-[0.7rem] text-[#444]"
                        style={{ fontFamily: 'var(--font-dm-mono)' }}
                      >
                        {repo.language}
                      </span>
                    </span>
                  ) : <span />}
                  {repo.stargazers_count > 0 && (
                    <span className="text-[0.7rem] text-[#333]" style={{ fontFamily: 'var(--font-dm-mono)' }}>
                      ★ {repo.stargazers_count}
                    </span>
                  )}
                </div>
              </a>
            ))}
      </div>
    </section>
  )
}
