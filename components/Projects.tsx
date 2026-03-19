'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import type { Repo } from '@/types'

const languageColors: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  PHP: '#4F5D95',
  Java: '#b07219',
  'C#': '#178600',
  'C++': '#f34b7d',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Go: '#00ADD8',
  Rust: '#dea584',
  Ruby: '#701516',
  Shell: '#89e051',
  Swift: '#ffac45',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
}

function SkeletonCard() {
  return (
    <div className="border border-[#1a1a1a] bg-[#0f0f0f] p-6 animate-pulse">
      <div className="h-4 bg-[#1a1a1a] rounded w-2/3 mb-3" />
      <div className="h-3 bg-[#1a1a1a] rounded w-full mb-2" />
      <div className="h-3 bg-[#1a1a1a] rounded w-4/5 mb-6" />
      <div className="h-3 bg-[#1a1a1a] rounded w-1/3" />
    </div>
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
    <section className="py-12 border-t border-[#1a1a1a]">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <h2
            className="text-[0.75rem] text-[#888] uppercase tracking-[0.1em]"
            style={{ fontFamily: 'var(--font-dm-mono)' }}
          >
            Projects
          </h2>
          <span
            className="text-[0.7rem] text-[#444]"
            style={{ fontFamily: 'var(--font-dm-mono)' }}
          >
            {isAuthenticated ? '(public + private)' : '(public)'}
          </span>
        </div>
        {isAuthenticated && (
          <button
            onClick={() => setShowForks((v) => !v)}
            className="text-[0.7rem] text-[#555] border border-[#1a1a1a] px-2.5 py-1 transition-colors duration-150 ease-in hover:border-[#333] hover:text-[#888]"
            style={{ fontFamily: 'var(--font-dm-mono)' }}
          >
            {showForks ? 'Hide forks' : 'Show forks'}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : filtered.map((repo) => (
              <div
                key={repo.id}
                className="border border-[#1a1a1a] bg-[#0f0f0f] p-6 flex flex-col gap-3 transition-colors duration-150 ease-in hover:border-[#333]"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3
                    className="text-[0.9rem] text-[#f5f5f5] leading-tight"
                    style={{ fontFamily: 'var(--font-dm-mono)' }}
                  >
                    {repo.name}
                  </h3>
                  {repo.private && (
                    <span
                      className="text-[0.65rem] text-[#444] border border-[#1a1a1a] px-1.5 py-0.5 shrink-0"
                      style={{ fontFamily: 'var(--font-dm-mono)' }}
                    >
                      private
                    </span>
                  )}
                </div>

                {repo.description && (
                  <p
                    className="text-[0.8rem] text-[#888] leading-relaxed"
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
                          className="w-2.5 h-2.5 rounded-full"
                          style={{
                            backgroundColor:
                              languageColors[repo.language] ?? '#555',
                          }}
                        />
                        <span
                          className="text-[0.75rem] text-[#888]"
                          style={{ fontFamily: 'var(--font-dm-mono)' }}
                        >
                          {repo.language}
                        </span>
                      </span>
                    )}
                    {repo.stargazers_count > 0 && (
                      <span
                        className="text-[0.75rem] text-[#555]"
                        style={{ fontFamily: 'var(--font-dm-mono)' }}
                      >
                        ★ {repo.stargazers_count}
                      </span>
                    )}
                  </div>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[0.7rem] text-[#555] border border-[#1a1a1a] px-2.5 py-1 transition-colors duration-150 ease-in hover:border-[#333] hover:text-[#888]"
                    style={{ fontFamily: 'var(--font-dm-mono)' }}
                  >
                    View on GitHub
                  </a>
                </div>
              </div>
            ))}
      </div>
    </section>
  )
}
