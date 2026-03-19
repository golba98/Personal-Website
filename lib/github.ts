import { Octokit } from '@octokit/rest'

export function getOctokit(accessToken: string) {
  return new Octokit({ auth: accessToken })
}

export async function fetchPublicRepos(username: string) {
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=100`,
    {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
      next: { revalidate: 3600 },
    }
  )
  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status}`)
  }
  return res.json()
}

export async function fetchContributions(accessToken: string, username: string) {
  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `

  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables: { username } }),
  })

  if (!res.ok) {
    throw new Error(`GitHub GraphQL error: ${res.status}`)
  }

  return res.json()
}
