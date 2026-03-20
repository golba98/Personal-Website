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
  Java:       '#b07219',
  PHP:        '#4F5D95',
  'C++':      '#f34b7d',
}
function langColor(lang: string | null) {
  return lang ? (languageColors[lang] ?? '#555') : '#555'
}

// ─── Skeleton ───────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="border border-[#1a1a1a] bg-[#0f0f0f] animate-pulse p-5 flex flex-col gap-3">
      <div className="h-3 bg-[#1a1a1a] rounded w-1/2" />
      <div className="h-2.5 bg-[#1a1a1a] rounded w-4/5" />
      <div className="h-2.5 bg-[#1a1a1a] rounded w-3/5 mt-1" />
      <div className="flex gap-2 mt-2">
        <div className="h-2 w-2 rounded-full bg-[#1a1a1a]" />
        <div className="h-2 bg-[#1a1a1a] rounded w-16" />
      </div>
    </div>
  )
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

  const allLangs = Array.from(
    new Set(repos.map(r => r.language).filter(Boolean))
  ) as string[]
  const tabs = ['All', ...allLangs.slice(0, 6)]

  const filtered = repos
    .filter(r => showForks || !r.fork)
    .filter(r => filter === 'All' || r.language === filter)

  const isAuthenticated = !!session

  return (
    <section ref={ref} className="pb-20">

      {/* ── Header row ── */}
      <div className="flex items-center justify-between mb-6">
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

      {/* ── Language filter tabs ── */}
      {!loading && tabs.length > 1 && (
        <div className="flex flex-wrap gap-1.5 mb-6">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className="text-[0.7rem] px-2.5 py-1 border transition-colors duration-150"
              style={{
                fontFamily:  'var(--font-dm-mono)',
                borderColor: filter === tab ? '#555' : '#1a1a1a',
                color:       filter === tab ? '#f5f5f5' : '#555',
              }}
            >
              {tab === 'All' ? 'All' : (
                <span className="flex items-center gap-1.5">
                  <span
                    style={{
                      width: '5px', height: '5px', borderRadius: '50%',
                      backgroundColor: langColor(tab), display: 'inline-block',
                    }}
                  />
                  {tab}
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* ── Error ── */}
      {error && (
        <p className="text-[0.8rem] text-[#444] mb-6" style={{ fontFamily: 'var(--font-dm-mono)' }}>
          {error}
        </p>
      )}

      {/* ── Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : filtered.length === 0
            ? (
              <p
                className="col-span-2 text-[0.8rem] text-[#444] py-4"
                style={{ fontFamily: 'var(--font-dm-mono)' }}
              >
                No repositories found.
              </p>
            )
            : filtered.map((repo, index) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-inview={String(inView)}
                  className="group project-card border border-[#1a1a1a] bg-[#0f0f0f] p-5 flex flex-col gap-2 hover:border-[#2a2a2a]"
                  style={{ transitionDelay: `${index * 30}ms` }}
                >
                  {/* Title row */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <h3
                        className="text-[0.85rem] text-[#f5f5f5] truncate group-hover:text-white transition-colors duration-150"
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
                      className="text-[0.8rem] text-[#555] leading-relaxed line-clamp-2"
                      style={{ fontFamily: 'var(--font-dm-sans)' }}
                    >
                      {repo.description}
                    </p>
                  )}

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-auto pt-2">
                    {repo.language ? (
                      <span className="flex items-center gap-1.5">
                        <span
                          style={{
                            width: '6px', height: '6px', borderRadius: '50%',
                            backgroundColor: langColor(repo.language), flexShrink: 0,
                          }}
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
                      <span
                        className="text-[0.7rem] text-[#333]"
                        style={{ fontFamily: 'var(--font-dm-mono)' }}
                      >
                        ★ {repo.stargazers_count}
                      </span>
                    )}
                  </div>
                </a>
              ))
        }
      </div>
    </section>
  )
}
