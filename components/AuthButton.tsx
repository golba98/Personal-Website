'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import Image from 'next/image'

export default function AuthButton() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div
        className="h-8 w-24 border border-[#1a1a1a] animate-pulse"
        style={{ fontFamily: 'var(--font-dm-mono)' }}
      />
    )
  }

  if (session) {
    return (
      <div className="flex items-center gap-3">
        {session.user?.image && (
          <Image
            src={session.user.image}
            alt={session.user.name ?? 'avatar'}
            width={24}
            height={24}
            className="rounded-full border border-[#333]"
          />
        )}
        <button
          onClick={() => signOut()}
          className="text-[0.75rem] text-[#888] border border-[#1a1a1a] px-3 py-1 transition-colors duration-150 ease-in hover:border-[#555] hover:text-[#f5f5f5]"
          style={{ fontFamily: 'var(--font-dm-mono)' }}
        >
          Logout
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => signIn('github')}
      className="text-[0.75rem] text-[#888] border border-[#1a1a1a] px-3 py-1 transition-colors duration-150 ease-in hover:border-[#555] hover:text-[#f5f5f5]"
      style={{ fontFamily: 'var(--font-dm-mono)' }}
    >
      Login with GitHub
    </button>
  )
}
