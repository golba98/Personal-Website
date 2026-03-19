'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import type { Repo } from '@/types'

const languageColors: Record<string, string> = {
  JavaScript: '#f7df1e',
  TypeScript: '#3178c6',
  Python: '#3572a5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
}

function getLanguageColor(lang: string | null): string {
  if (!lang) return '#888'
  return languageColors[lang] ?? '#888'
}

function SkeletonCard() {
  return (
    <div className="border border-[#1a1a1a] bg-[#1a1a1a] p-6 animate-pulse h-36" />
  )
}

export default function Projects() {
  const { data: session } = useSession()
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(true)
  const [showForks, setShowForks] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetch('/api/repos')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load')
        return res.json()
      })
      .then((data: Repo[]) => {
        setRepos(data)
        setLoading(false)
      })
      .catch(() => {
        setError('Failed to load repositories.')
        setLoading(false)
      })
  }, [session])

  const filtered = showForks ? repos : repos.filter((r) => !r.fork)
  const isAuthenticated = !!session

  return (
    <section className="pb-20">
      <div className="flex items-center justify-between mb-8">
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
            onClick={() => setShowForks((v) => !v)}
            className="text-[0.7rem] text-[#555] border border-[#1a1a1a] px-2.5 py-1 transition-colors duration-150 ease-in hover:border-[#333] hover:text-[#888]"
            style={{ fontFamily: 'var(--font-dm-mono)' }}
          >
            {showForks ? 'hide forks' : 'include forks'}
          </button>
        )}
      </div>

      {error && (
        <p
          className="text-[0.8rem] text-[#888] mb-6"
          style={{ fontFamily: 'var(--font-dm-mono)' }}
        >
          {error}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
          : filtered.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative border border-[#1a1a1a] bg-[#0f0f0f] p-6 flex flex-col gap-2 transition-colors duration-150 ease-in hover:border-[#333] block"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3
                    className="text-[0.9rem] text-[#f5f5f5] leading-tight"
                    style={{ fontFamily: 'var(--font-dm-mono)' }}
                  >
                    {repo.name}
                  </h3>
                  <span
                    className="text-[0.7rem] text-[#555] opacity-0 group-hover:opacity-100 transition-opacity duration-150 ease-in shrink-0 mt-0.5"
                    style={{ fontFamily: 'var(--font-dm-mono)' }}
                  >
                    ↗ View repo
                  </span>
                </div>

                {repo.description && (
                  <p
                    className="text-[0.85rem] text-[#888] leading-relaxed line-clamp-2"
                    style={{ fontFamily: 'var(--font-dm-sans)' }}
                  >
                    {repo.description}
                  </p>
                )}

                <div className="flex items-center justify-between mt-auto pt-2">
                  <div className="flex items-center gap-3">
                    {repo.language && (
                      <span className="flex items-center gap-1.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: getLanguageColor(repo.language) }}
                        />
                        <span
                          className="text-[0.75rem] text-[#888]"
                          style={{ fontFamily: 'var(--font-dm-mono)' }}
                        >
                          {repo.language}
                        </span>
                      </span>
                    )}
                  </div>
                  {repo.stargazers_count > 0 && (
                    <span
                      className="text-[0.75rem] text-[#555]"
                      style={{ fontFamily: 'var(--font-dm-mono)' }}
                    >
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
