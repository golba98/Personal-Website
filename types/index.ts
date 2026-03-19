import type { DefaultSession } from 'next-auth'

export interface Repo {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  language: string | null
  stargazers_count: number
  fork: boolean
  updated_at: string | null
  private: boolean
  visibility: string
}

export interface ContributionDay {
  date: string
  contributionCount: number
}

export interface ContributionWeek {
  contributionDays: ContributionDay[]
}

declare module 'next-auth' {
  interface Session extends DefaultSession {
    accessToken: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string
  }
}
