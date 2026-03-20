'use client'

import AuthButton from './AuthButton'

export default function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6"
      style={{
        height: '56px',
        backgroundColor: 'rgba(10, 10, 10, 0.8)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
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
