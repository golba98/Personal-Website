'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import TextReveal from './TextReveal'

type LogEntry = {
  type: 'input' | 'output' | 'error'
  content: string | React.ReactNode
}

export default function Terminal() {
  const [input, setInput] = useState('')
  const [logs, setLogs] = useState<LogEntry[]>([
    { type: 'output', content: 'Welcome to Jordan\'s interactive portfolio terminal.' },
    { type: 'output', content: 'Type "help" to see available commands.' },
  ])
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [logs])

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase()
    const newLogs: LogEntry[] = [...logs, { type: 'input', content: cmd }]

    switch (trimmed) {
      case 'help':
        newLogs.push({
          type: 'output',
          content: 'Available commands: help, clear, whoami, projects, skills, contact, ls',
        })
        break
      case 'clear':
        setLogs([])
        return
      case 'whoami':
        newLogs.push({
          type: 'output',
          content: 'Jordan Vorster - CS Student @ University of London. Passionate about software engineering, AI, and systems optimization.',
        })
        break
      case 'ls':
      case 'projects':
        newLogs.push({
          type: 'output',
          content: 'Featured: GeoQuest 3D, RugbyMate, TryPOS, BinCalc, FileFlow. Check the Projects section below for more details!',
        })
        break
      case 'skills':
        newLogs.push({
          type: 'output',
          content: 'Python, JavaScript, PHP, Java, C++, React, Node.js, Docker, Linux, Git, etc.',
        })
        break
      case 'contact':
        newLogs.push({
          type: 'output',
          content: 'Email: jordanvorster404@gmail.com | LinkedIn: jordan-vorster-49464122b',
        })
        break
      case '':
        break
      default:
        newLogs.push({
          type: 'error',
          content: `Command not found: ${trimmed}. Type "help" for a list of commands.`,
        })
    }
    setLogs(newLogs)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleCommand(input)
    setInput('')
  }

  return (
    <section className="pb-20">
      <TextReveal className="mb-6">
        <h2
          className="text-[0.75rem] text-[#888] uppercase tracking-[0.1em]"
          style={{ fontFamily: 'var(--font-dm-mono)' }}
        >
          — Portfolio CLI
        </h2>
      </TextReveal>

      <div
        className={`border transition-colors duration-300 ${
          isFocused ? 'border-[#333] bg-[#0c0c0c]' : 'border-[#1a1a1a] bg-[#0a0a0a]'
        } p-4 md:p-6 font-mono text-[0.8rem] leading-relaxed relative overflow-hidden h-[320px] flex flex-col`}
        onClick={() => inputRef.current?.focus()}
        style={{ fontFamily: 'var(--font-dm-mono)' }}
      >
        <div ref={scrollRef} className="flex-1 overflow-y-auto mb-2 custom-scrollbar">
          {logs.map((log, i) => (
            <div key={i} className="mb-1.5 break-words">
              {log.type === 'input' && <span className="text-[#555] mr-2">$</span>}
              <span
                className={
                  log.type === 'input'
                    ? 'text-[#f5f5f5]'
                    : log.type === 'error'
                    ? 'text-[#f43f5e]'
                    : 'text-[#888]'
                }
              >
                {log.content}
              </span>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-auto">
          <span className="text-[#555]">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="flex-1 bg-transparent border-none outline-none text-[#f5f5f5] p-0"
            autoFocus
            spellCheck={false}
            autoComplete="off"
          />
        </form>

        {/* Glossy scanline effect */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10" />
      </div>
    </section>
  )
}
