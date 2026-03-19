import { NextResponse } from 'next/server'
import { jsPDF } from 'jspdf'

export async function GET() {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })

  const pageW  = 210
  const pageH  = 297
  const margin = 20
  const cW     = pageW - margin * 2   // content width: 170mm
  let y        = 20

  const FONT   = 'times'
  const LH     = 5.6   // line height for 10pt times

  // ── Utilities ────────────────────────────────────────────────────────

  /** Add vertical space */
  const gap = (mm: number) => { y += mm }

  /** Add a new page if less than `needed` mm remain */
  const checkBreak = (needed = 15) => {
    if (y + needed > pageH - 18) {
      doc.addPage()
      y = 20
    }
  }

  /** Full-width black horizontal rule at current y */
  const hr = () => {
    doc.setDrawColor(0)
    doc.setLineWidth(0.2)
    doc.line(margin, y, margin + cW, y)
  }

  /**
   * Section header:
   *   (gap) — HR — TITLE CENTERED BOLD — HR — (gap)
   */
  const sectionHeader = (title: string) => {
    checkBreak(22)
    gap(3)
    hr()
    y += 5
    doc.setFont(FONT, 'bold')
    doc.setFontSize(11)
    doc.setTextColor(0)
    doc.text(title.toUpperCase(), pageW / 2, y, { align: 'center' })
    y += 3
    hr()
    y += 5
  }

  /**
   * Plain wrapped text block.
   * indent — left indent in mm (added to margin)
   */
  const block = (
    str: string,
    size  = 10,
    style: 'normal' | 'bold' | 'italic' | 'bolditalic' = 'normal',
    indent = 0,
    align: 'left' | 'center' = 'left',
  ) => {
    checkBreak(8)
    doc.setFont(FONT, style)
    doc.setFontSize(size)
    doc.setTextColor(0)
    const x     = align === 'center' ? pageW / 2 : margin + indent
    const lines = doc.splitTextToSize(str, cW - indent)
    doc.text(lines, x, y, align === 'center' ? { align: 'center' } : undefined)
    y += lines.length * LH
  }

  /**
   * Bullet line where the title is bold.
   * • BOLD_TITLE
   *     (desc lines indented)
   */
  const bulletBold = (title: string) => {
    checkBreak(8)
    doc.setFont(FONT, 'normal')
    doc.setFontSize(10)
    doc.setTextColor(0)
    doc.text('\u2022', margin + 2, y)
    doc.setFont(FONT, 'bold')
    const lines = doc.splitTextToSize(title, cW - 6)
    doc.text(lines, margin + 6, y)
    y += lines.length * LH
  }

  /**
   * Indented description line(s) after a bullet.
   */
  const desc = (str: string) => {
    checkBreak(8)
    doc.setFont(FONT, 'normal')
    doc.setFontSize(10)
    doc.setTextColor(0)
    const lines = doc.splitTextToSize(str, cW - 10)
    doc.text(lines, margin + 10, y)
    y += lines.length * LH
  }

  /**
   * Bullet with BOLD label then NORMAL continuation on the same line.
   * Handles wrapping: overflow lines start at the text indent (not after bold).
   * • BOLD_PART  normal_part ...
   */
  const bulletMixed = (boldPart: string, normalPart: string) => {
    checkBreak(8)
    doc.setFontSize(10)
    doc.setTextColor(0)

    const bx = margin + 2       // bullet x
    const tx = margin + 6       // text start x
    const tw = cW - 6           // max text width

    // Bullet char
    doc.setFont(FONT, 'normal')
    doc.text('\u2022', bx, y)

    // Bold label
    doc.setFont(FONT, 'bold')
    doc.text(boldPart, tx, y)
    const bw = doc.getTextWidth(boldPart)

    // Normal continuation — fit remainder of line 1 after bold
    doc.setFont(FONT, 'normal')
    const avail1 = tw - bw
    const normal = normalPart.trimStart()

    if (avail1 >= 10 && normal.length > 0) {
      const parts = doc.splitTextToSize(normal, avail1)
      doc.text(parts[0] ?? '', tx + bw, y)
      y += LH
      if (parts.length > 1) {
        // Re-wrap remaining text at full tw for subsequent lines
        const usedChars = (parts[0] ?? '').length
        const rest = normal.substring(usedChars).trimStart()
        if (rest) {
          const more = doc.splitTextToSize(rest, tw)
          doc.text(more, tx, y)
          y += more.length * LH
        }
      }
    } else {
      // Not enough room — normal text drops to next line
      y += LH
      const lines = doc.splitTextToSize(normal, tw)
      doc.text(lines, tx, y)
      y += lines.length * LH
    }
  }

  /**
   * Bullet where the institution/source is in italics.
   * • normalText - *italicSource*
   */
  const bulletCert = (normalText: string, italicSource: string, extraDesc?: string) => {
    checkBreak(extraDesc ? 16 : 8)
    const bx = margin + 2
    const tx = margin + 6
    const tw = cW - 6

    doc.setFontSize(10)
    doc.setTextColor(0)
    doc.setFont(FONT, 'normal')
    doc.text('\u2022', bx, y)

    // Measure normal part width
    const nw = doc.getTextWidth(normalText)
    doc.text(normalText, tx, y)

    // Italic source
    doc.setFont(FONT, 'italic')
    doc.text(italicSource, tx + nw, y)
    y += LH

    // Optional extra description (indented)
    if (extraDesc) {
      doc.setFont(FONT, 'normal')
      const lines = doc.splitTextToSize(extraDesc, tw - 4)
      doc.text(lines, tx + 4, y)
      y += lines.length * LH
    }
  }

  // ════════════════════════════════════════════════════════════════════
  // NAME
  // ════════════════════════════════════════════════════════════════════
  doc.setFont(FONT, 'bold')
  doc.setFontSize(20)
  doc.setTextColor(0)
  doc.text('Jordan L Vorster', pageW / 2, y, { align: 'center' })
  y += 9

  // Contact line — italic, centered
  doc.setFont(FONT, 'italic')
  doc.setFontSize(10)
  doc.text(
    'South Africa, Eastern Cape | +27 82 254 1235 | jordanvorster404@gmail.com',
    pageW / 2, y, { align: 'center' }
  )
  y += 7

  // ════════════════════════════════════════════════════════════════════
  // PROFILE SUMMARY
  // ════════════════════════════════════════════════════════════════════
  sectionHeader('Profile Summary')

  block(
    'I am a Computer Science student with a solid technical background in Python, JavaScript, PHP, and Delphi. ' +
    'Experienced with full-stack concepts, algorithmic thinking, and efficient program design through academic ' +
    'coursework, CS50, and self-driven projects. I am skilled at building practical solutions-from POS systems to ' +
    '3D games and utility tools. Seeking an internship opportunity to apply technical skills, gain industry ' +
    'experience, and collaborate on impactful software projects.',
    10
  )

  // ════════════════════════════════════════════════════════════════════
  // EDUCATION
  // ════════════════════════════════════════════════════════════════════
  sectionHeader('Education')

  block('University of London \u2014 Bachelor of Science, Computer Science', 10, 'bold')
  block('Full-time Distance Learning - Currently Enrolled', 10, 'italic')
  gap(1)
  // Bullet
  doc.setFont(FONT, 'normal')
  doc.setFontSize(10)
  doc.text('\u2022', margin + 6, y)
  const edLines = doc.splitTextToSize(
    "Expected to complete degree through the University of London\u2019s global learning program.",
    cW - 14
  )
  doc.text(edLines, margin + 12, y)
  y += edLines.length * LH

  // ════════════════════════════════════════════════════════════════════
  // WORK EXPERIENCE
  // ════════════════════════════════════════════════════════════════════
  sectionHeader('Work Experience')

  bulletBold('Part-time Waiter - 2022')
  desc('Worked in a high-pressure restaurant environment, serving customers, resetting tables, and ensuring excellent guest experiences.')
  desc('Improved communication skills, teamwork, and emotional resilience while navigating busy rush periods and diverse personalities.')
  gap(2)

  bulletBold('Summer Crew Member - 2021 & 2023')
  desc('Maintained guest areas during peak holiday periods, including room prep, general cleaning, and poolside upkeep.')
  desc('Took initiative by leading a small team, ensuring all guest areas were ready on time and met required standards.')
  gap(2)

  bulletBold('Part-time Intern - Pam Golding Properties (2024)')
  desc('Assisted with photographing homes, preparing listings, and completing documentation for new properties.')
  desc('Helped with inventory checking, property value estimation, and preparing houses for arrivals.')
  desc('Worked with agents to troubleshoot issues and streamline day-to-day operations.')

  // ════════════════════════════════════════════════════════════════════
  // PROJECTS
  // ════════════════════════════════════════════════════════════════════
  sectionHeader('Projects')

  bulletMixed('GeoQuest 3D',  ': Developed a 3D geo-guesser style game with interactive exploration.')
  bulletMixed('RugbyMate',    ': Built an event-management program used for a school rugby tournament.')
  bulletMixed('TryPOS',       ': Created a functional point-of-sale (POS) system tailored for school event stalls.')
  bulletMixed('BinCalc',      ': Designed a binary calculator for HP Prime featuring user-friendly menus.')
  bulletMixed('FileFlow',     ': Built utility apps (file organizers, study tools, automation scripts) to improve workflow efficiency.')
  bulletMixed('EduTool',      ': Experimented with small educational apps that simplify math and programming concepts.')
  bulletMixed('GameOpt',      ': Worked on optimizing gaming setups, focusing on latency, scaling, and performance.')

  // ════════════════════════════════════════════════════════════════════
  // LEADERSHIP & INVOLVEMENT
  // ════════════════════════════════════════════════════════════════════
  sectionHeader('Leadership & Involvement')

  bulletBold('Debating Society:')
  desc('Active from Grade 8\u201312; developed strong public-speaking and argumentation skills.')
  gap(1)

  bulletBold('Chess Team:')
  desc('Represented school in competitions, enhanced strategic and long-term planning abilities.')
  gap(1)

  bulletBold('Programming Team Co-Leader:')
  desc('Mentored peers, coordinated projects, and supported problem-solving in coding challenges.')
  gap(1)

  bulletBold('South African Mathematics Olympiad (SAMO) - Participant (Grade 9\u201311):')
  desc(
    'Competed annually in one of South Africa\u2019s top mathematics challenges, strengthening analytical ' +
    'thinking, logical reasoning, and problem-solving under pressure.'
  )

  // ════════════════════════════════════════════════════════════════════
  // CERTIFICATIONS
  // ════════════════════════════════════════════════════════════════════
  sectionHeader('Certifications')

  bulletCert('Introduction to Cloud Computing - ', 'Coursera')
  bulletCert('Introduction to Calculus / Calculus Fundamentals - ', 'Coursera')
  bulletCert(
    'CS50: Introduction to Computer Science - ',
    'Harvard University (edX)',
    'Recognized worldwide as a rigorous foundational programming and problem-solving course ' +
    'covering C, Python, algorithms, data structures, memory, and software engineering principles.'
  )

  // ════════════════════════════════════════════════════════════════════
  // TECHNICAL SKILLS
  // ════════════════════════════════════════════════════════════════════
  sectionHeader('Technical Skills')

  bulletMixed('Languages:',        ' Python, Java, C# (intro), C++ (intro), JavaScript, SQL, PHP')
  bulletMixed('Tools:',            ' Git, Docker, Linux, VS Code, Unity, Unreal Engine, GitHub, Anti-Gravity')
  bulletMixed('Web:',              ' HTML, CSS, React, Node.js')
  bulletMixed('Other:',            ' Cybersecurity basics, Game Development, Database design, AI/ML interest')
  bulletMixed('LLMS Experience:',  ' ChatGPT Codex 5.3, Gemini 3.1 Pro, Claude 3.5 Sonnet, Ollama, LM Studio, Hugging Face TRL, ASUS Multi-LM Tuner, VS Code.')

  // ════════════════════════════════════════════════════════════════════
  // SKILLS AND INTERESTS
  // ════════════════════════════════════════════════════════════════════
  sectionHeader('Skills and Interests:')

  const interests = [
    'Mathematics and analytical problem-solving',
    'Programming and software development',
    'Physics and scientific reasoning',
    'Continuous learning and exploring new technologies',
    'PC building and hardware optimization',
    'Local AI/LLM experimentation',
  ]
  for (const item of interests) {
    checkBreak(7)
    doc.setFont(FONT, 'normal')
    doc.setFontSize(10)
    doc.setTextColor(0)
    doc.text('\u2022', margin + 2, y)
    const lines = doc.splitTextToSize(item, cW - 10)
    doc.text(lines, margin + 6, y)
    y += lines.length * LH
  }

  // ════════════════════════════════════════════════════════════════════
  // OUTPUT
  // ════════════════════════════════════════════════════════════════════
  const pdfBuffer = Buffer.from(doc.output('arraybuffer'))

  return new NextResponse(pdfBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="Jordan_Vorster_CV.pdf"',
    },
  })
}
