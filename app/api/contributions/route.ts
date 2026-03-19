import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { fetchContributions } from '@/lib/github'

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session?.accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const username = session.user?.name ?? session.user?.email ?? ''

    // Fetch the authenticated user's login from GitHub
    const userRes = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
    })

    if (!userRes.ok) {
      throw new Error('Failed to fetch user info')
    }

    const userData = await userRes.json()
    const login = userData.login as string

    const data = await fetchContributions(session.accessToken, login)

    const calendar =
      data?.data?.user?.contributionsCollection?.contributionCalendar

    if (!calendar) {
      return NextResponse.json({ error: 'No contribution data found' }, { status: 404 })
    }

    return NextResponse.json({
      weeks: calendar.weeks,
      totalContributions: calendar.totalContributions,
    })
  } catch (error) {
    console.error('Error fetching contributions:', error)
    return NextResponse.json({ error: 'Failed to fetch contributions' }, { status: 500 })
  }
}
