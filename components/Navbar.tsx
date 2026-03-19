'use client'

import AuthButton from './AuthButton'

export default function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6"
      style={{
        height: '56px',
        backgroundColor: '#0a0a0a',
        borderBottom: '1px solid #1a1a1a',
      }}
    >
      <span
        className="text-[#f5f5f5] text-sm tracking-widest"
        style={{ fontFamily: 'var(--font-dm-mono)' }}
      >
        JV
      </span>
      <AuthButton />
    </nav>
  )
}
