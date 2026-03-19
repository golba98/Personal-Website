'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import type { ContributionWeek } from '@/types'

function getColor(count: number): string {
  if (count === 0) return '#1a1a1a'
  if (count <= 3) return '#333'
  if (count <= 6) return '#555'
  if (count <= 9) return '#888'
  return '#fff'
}

const MONTH_LABELS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

function getMonthPositions(weeks: ContributionWeek[]) {
  const positions: { label: string; col: number }[] = []
  let lastMonth = -1

  weeks.forEach((week, colIndex) => {
    const firstDay = week.contributionDays[0]
    if (!firstDay) return
    const month = new Date(firstDay.date).getMonth()
    if (month !== lastMonth) {
      positions.push({ label: MONTH_LABELS[month], col: colIndex })
      lastMonth = month
    }
  })

  return positions
}

export default function ContributionGraph() {
  const { data: session } = useSession()
  const [weeks, setWeeks] = useState<ContributionWeek[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!session) return

    setLoading(true)
    setError(null)

    fetch('/api/contributions')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load')
        return res.json()
      })
      .then((data: { weeks: ContributionWeek[]; totalContributions: number }) => {
        setWeeks(data.weeks)
        setTotal(data.totalContributions)
        setLoading(false)
      })
      .catch(() => {
        setError('Failed to load contribution data.')
        setLoading(false)
      })
  }, [session])

  if (!session) return null

  const monthPositions = getMonthPositions(weeks)

  return (
    <section className="py-12 border-t border-[#1a1a1a]">
      <div className="flex items-center gap-4 mb-6">
        <h2
          className="text-[0.75rem] text-[#888] uppercase tracking-[0.1em]"
          style={{ fontFamily: 'var(--font-dm-mono)' }}
        >
          Contributions
        </h2>
        {!loading && total > 0 && (
          <span
            className="text-[0.75rem] text-[#444]"
            style={{ fontFamily: 'var(--font-dm-mono)' }}
          >
            {total.toLocaleString()} this year
          </span>
        )}
      </div>

      {error && (
        <p
          className="text-[0.8rem] text-[#888]"
          style={{ fontFamily: 'var(--font-dm-mono)' }}
        >
          {error}
        </p>
      )}

      {loading && (
        <div className="h-24 flex items-center">
          <span
            className="text-[0.75rem] text-[#444]"
            style={{ fontFamily: 'var(--font-dm-mono)' }}
          >
            Loading...
          </span>
        </div>
      )}

      {!loading && weeks.length > 0 && (
        <div className="overflow-x-auto">
          <div style={{ minWidth: 'max-content' }}>
            {/* Month labels */}
            <div className="flex mb-1" style={{ gap: '2px' }}>
              {weeks.map((_, colIndex) => {
                const monthPos = monthPositions.find((m) => m.col === colIndex)
                return (
                  <div
                    key={colIndex}
                    style={{ width: '10px' }}
                    className="flex items-center justify-start"
                  >
                    {monthPos && (
                      <span
                        className="text-[0.6rem] text-[#444] whitespace-nowrap"
                        style={{
                          fontFamily: 'var(--font-dm-mono)',
                          fontSize: '0.6rem',
                        }}
                      >
                        {monthPos.label}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Grid */}
            <div className="flex" style={{ gap: '2px' }}>
              {weeks.map((week, colIndex) => (
                <div
                  key={colIndex}
                  className="flex flex-col"
                  style={{ gap: '2px' }}
                >
                  {week.contributionDays.map((day) => (
                    <div
                      key={day.date}
                      title={`${day.date}: ${day.contributionCount} contributions`}
                      style={{
                        width: '10px',
                        height: '10px',
                        backgroundColor: getColor(day.contributionCount),
                        flexShrink: 0,
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
