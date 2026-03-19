export default function Footer() {
  const year = new Date().getFullYear()
  const githubUsername = process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? 'golba98'

  return (
    <footer
      className="border-t border-[#1a1a1a] py-8 mt-16 text-center"
      style={{ fontFamily: 'var(--font-dm-mono)' }}
    >
      <p className="text-[0.75rem] text-[#444] mb-2">
        Jordan Vorster · {year} · Eastern Cape, South Africa
      </p>
      <p className="text-[0.75rem] text-[#444] flex items-center justify-center gap-3 flex-wrap">
        <a
          href={`https://github.com/${githubUsername}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#888] transition-colors duration-150 ease-in"
        >
          GitHub
        </a>
        <span>·</span>
        <a
          href="https://www.linkedin.com/in/jordan-vorster-49464122b/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#888] transition-colors duration-150 ease-in"
        >
          LinkedIn
        </a>
        <span>·</span>
        <a
          href="mailto:jordanvorster404@gmail.com"
          className="hover:text-[#888] transition-colors duration-150 ease-in"
        >
          jordanvorster404@gmail.com
        </a>
      </p>
    </footer>
  )
}
