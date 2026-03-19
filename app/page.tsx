import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import ContributionGraph from '@/components/ContributionGraph'

export default function Home() {
  const year = new Date().getFullYear()

  return (
    <>
      <Navbar />
      <main
        style={{ paddingTop: '56px' }}
        className="max-w-[900px] mx-auto px-6"
      >
        <Hero />
        <Skills />
        <ContributionGraph />
        <Projects />
        <footer className="py-12 text-center">
          <p
            className="text-[#444] text-[0.8rem]"
            style={{ fontFamily: 'var(--font-dm-mono)' }}
          >
            Jordan Vorster · {year} · Eastern Cape, ZA
          </p>
        </footer>
      </main>
    </>
  )
}
