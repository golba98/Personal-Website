export default function Hero() {
  return (
    <section className="py-24">
      <h1
        className="text-[3.5rem] font-light text-[#f5f5f5] leading-none mb-4"
        style={{ fontFamily: 'var(--font-dm-sans)' }}
      >
        Jordan Vorster
      </h1>
      <p
        className="text-[1rem] text-[#f5f5f5] mb-2"
        style={{ fontFamily: 'var(--font-dm-mono)' }}
      >
        CS Student &amp; Developer
      </p>
      <p
        className="text-[0.85rem] text-[#888] mb-2"
        style={{ fontFamily: 'var(--font-dm-mono)' }}
      >
        University of London · Eastern Cape, South Africa
      </p>
      <p
        className="text-[0.85rem] text-[#555] mb-8"
        style={{ fontFamily: 'var(--font-dm-mono)' }}
      >
        Building tools, automating workflows, exploring AI.
      </p>
      <div className="flex gap-4">
        <a
          href={`https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME ?? 'jordanvorster'}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[0.75rem] text-[#888] border border-[#1a1a1a] px-3 py-1.5 transition-colors duration-150 ease-in hover:border-[#555] hover:text-[#f5f5f5]"
          style={{ fontFamily: 'var(--font-dm-mono)' }}
        >
          GitHub
        </a>
        <a
          href="mailto:jordan@jordanvorsterwebsite.online"
          className="text-[0.75rem] text-[#888] border border-[#1a1a1a] px-3 py-1.5 transition-colors duration-150 ease-in hover:border-[#555] hover:text-[#f5f5f5]"
          style={{ fontFamily: 'var(--font-dm-mono)' }}
        >
          Email
        </a>
      </div>
    </section>
  )
}
