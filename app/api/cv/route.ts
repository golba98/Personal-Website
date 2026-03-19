import { NextResponse } from 'next/server'
import { jsPDF } from 'jspdf'

export async function GET() {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })

  const pageW = 210
  const margin = 20
  const contentW = pageW - margin * 2
  let y = 20

  const githubUsername = process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? 'golba98'

  // Helpers
  const setStyle = (size: number, style: 'normal' | 'bold' = 'normal', color = 0) => {
    doc.setFontSize(size)
    doc.setFont('helvetica', style)
    doc.setTextColor(color)
  }

  const line = (text: string, size: number, style: 'normal' | 'bold' = 'normal', color = 0, indent = 0) => {
    setStyle(size, style, color)
    const lines = doc.splitTextToSize(text, contentW - indent)
    doc.text(lines, margin + indent, y)
    y += (Array.isArray(lines) ? lines.length : 1) * size * 0.45 + 1
  }

  const gap = (mm: number) => { y += mm }

  const sectionHeader = (title: string) => {
    gap(4)
    setStyle(9, 'bold', 0)
    doc.text(title.toUpperCase(), margin, y)
    y += 4
    doc.setDrawColor(180)
    doc.line(margin, y, margin + contentW, y)
    y += 3
  }

  // ── Header ──────────────────────────────────────────────────────────────
  setStyle(22, 'bold')
  doc.text('Jordan Vorster', margin, y)
  y += 9

  setStyle(10, 'normal', 80)
  doc.text('CS Student & Developer', margin, y)
  y += 5

  setStyle(9, 'normal', 100)
  const contactLine = `jordanvorster404@gmail.com  |  +27 82 254 1235  |  Eastern Cape, South Africa`
  doc.text(contactLine, margin, y)
  y += 4

  setStyle(9, 'normal', 100)
  doc.text(
    `linkedin.com/in/jordan-vorster-49464122b  |  github.com/${githubUsername}`,
    margin,
    y
  )
  y += 5

  doc.setDrawColor(0)
  doc.line(margin, y, margin + contentW, y)
  y += 5

  // ── Profile Summary ──────────────────────────────────────────────────────
  sectionHeader('Profile Summary')
  line(
    'Computer Science student with a solid technical background in Python, JavaScript, PHP, and Delphi. Experienced with full-stack concepts, algorithmic thinking, and efficient program design. Skilled at building practical solutions from POS systems to 3D games and automation tools. Seeking internship and junior developer opportunities to apply technical skills, gain industry experience, and collaborate on impactful software projects.',
    9
  )

  // ── Education ───────────────────────────────────────────────────────────
  sectionHeader('Education')
  line('University of London', 10, 'bold')
  gap(-1)
  line('BSc Computer Science — Currently Enrolled, Distance Learning', 9)

  // ── Experience ──────────────────────────────────────────────────────────
  sectionHeader('Experience')

  line('Part-time Intern — Pam Golding Properties', 10, 'bold')
  gap(-1)
  line('2024', 9, 'normal', 120)
  gap(1)
  const pamTasks = [
    'Assisted with photographing homes, preparing listings, and documentation',
    'Inventory checking, property value estimation, house preparation',
    'Worked with agents to troubleshoot and streamline operations',
  ]
  for (const t of pamTasks) {
    setStyle(9)
    const wrapped = doc.splitTextToSize(`• ${t}`, contentW - 4)
    doc.text(wrapped, margin + 2, y)
    y += wrapped.length * 4.1 + 0.5
  }
  gap(2)

  line('Summer Crew Member', 10, 'bold')
  gap(-1)
  line('2021 & 2023', 9, 'normal', 120)
  gap(1)
  const summerTasks = [
    'Maintained guest areas during peak holiday periods',
    'Led small team ensuring guest areas met required standards',
  ]
  for (const t of summerTasks) {
    setStyle(9)
    const wrapped = doc.splitTextToSize(`• ${t}`, contentW - 4)
    doc.text(wrapped, margin + 2, y)
    y += wrapped.length * 4.1 + 0.5
  }
  gap(2)

  line('Part-time Waiter', 10, 'bold')
  gap(-1)
  line('2022', 9, 'normal', 120)
  gap(1)
  const waiterTasks = [
    'High-pressure restaurant environment, customer service',
    'Improved communication, teamwork, and emotional resilience',
  ]
  for (const t of waiterTasks) {
    setStyle(9)
    const wrapped = doc.splitTextToSize(`• ${t}`, contentW - 4)
    doc.text(wrapped, margin + 2, y)
    y += wrapped.length * 4.1 + 0.5
  }

  // ── Projects ─────────────────────────────────────────────────────────────
  sectionHeader('Projects')

  const projects = [
    ['GeoQuest 3D', '3D geo-guesser style game with interactive exploration'],
    ['RugbyMate', 'Event-management program for school rugby tournament'],
    ['TryPOS', 'Functional point-of-sale system for school event stalls'],
    ['BinCalc', 'Binary calculator for HP Prime with user-friendly menus'],
    ['FileFlow', 'File organizers, study tools, and automation scripts'],
    ['EduTool', 'Educational apps simplifying math and programming concepts'],
    ['GameOpt', 'Gaming setup optimization focused on latency and performance'],
  ]

  for (const [name, desc] of projects) {
    setStyle(9, 'bold')
    const nameW = doc.getTextWidth(name + '  ')
    doc.text(name, margin + 2, y)
    setStyle(9, 'normal', 80)
    const wrapped = doc.splitTextToSize(desc, contentW - 4 - nameW)
    doc.text(wrapped, margin + 2 + nameW, y)
    y += 4.5
  }

  // ── Skills ────────────────────────────────────────────────────────────────
  sectionHeader('Skills')

  const skillGroups = [
    ['Languages', 'Python, JavaScript, PHP, Java, C#, C++, SQL'],
    ['Web', 'HTML, CSS, React, Node.js'],
    ['Tools', 'Git, Docker, Linux, VS Code, Unity, Unreal Engine, GitHub'],
    ['Other', 'Cybersecurity basics, Game Development, Database design, AI/ML'],
  ]

  for (const [label, skills] of skillGroups) {
    setStyle(9, 'bold')
    const lw = doc.getTextWidth(label + ':  ')
    doc.text(`${label}:`, margin + 2, y)
    setStyle(9, 'normal')
    const wrapped = doc.splitTextToSize(skills, contentW - 4 - lw)
    doc.text(wrapped, margin + 2 + lw, y)
    y += wrapped.length * 4.3 + 0.5
  }

  // ── Certifications ────────────────────────────────────────────────────────
  sectionHeader('Certifications')

  const certs = [
    'CS50: Introduction to Computer Science — Harvard University (edX)',
    'Introduction to Cloud Computing — Coursera',
    'Introduction to Calculus / Calculus Fundamentals — Coursera',
  ]
  for (const c of certs) {
    setStyle(9)
    const wrapped = doc.splitTextToSize(`• ${c}`, contentW - 4)
    doc.text(wrapped, margin + 2, y)
    y += wrapped.length * 4.1 + 0.5
  }

  // ── Leadership ────────────────────────────────────────────────────────────
  sectionHeader('Leadership & Activities')

  const leadership = [
    'Debating Society — Grade 8–12',
    'Chess Team — school competitions',
    'Programming Team Co-Leader — mentored peers, coordinated projects',
    'South African Mathematics Olympiad (SAMO) — Participant, Grade 9–11',
  ]
  for (const l of leadership) {
    setStyle(9)
    const wrapped = doc.splitTextToSize(`• ${l}`, contentW - 4)
    doc.text(wrapped, margin + 2, y)
    y += wrapped.length * 4.1 + 0.5
  }

  // ── Output ────────────────────────────────────────────────────────────────
  const pdfBuffer = Buffer.from(doc.output('arraybuffer'))

  return new NextResponse(pdfBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="Jordan_Vorster_CV.pdf"',
    },
  })
}
