import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getOctokit, fetchPublicRepos } from '@/lib/github'
import type { Repo } from '@/types'

export async function GET() {
  const session = await getServerSession(authOptions)

  try {
    let repos: Repo[]

    if (session?.accessToken) {
      const octokit = getOctokit(session.accessToken)
      const data = await octokit.paginate(
        octokit.rest.repos.listForAuthenticatedUser,
        { visibility: 'all', per_page: 100 }
      )
      repos = data as Repo[]
    } else {
      const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME
      if (!username) {
        return NextResponse.json({ error: 'GitHub username not configured' }, { status: 500 })
      }
      repos = await fetchPublicRepos(username)
    }

    const sorted = repos.sort((a, b) => {
      const dateA = a.updated_at ? new Date(a.updated_at).getTime() : 0
      const dateB = b.updated_at ? new Date(b.updated_at).getTime() : 0
      return dateB - dateA
    })

    return NextResponse.json(sorted)
  } catch (error) {
    console.error('Error fetching repos:', error)
    return NextResponse.json({ error: 'Failed to fetch repositories' }, { status: 500 })
  }
}
