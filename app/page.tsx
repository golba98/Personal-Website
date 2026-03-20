import Navbar from '@/components/Navbar'
import ScrollProgress from '@/components/ScrollProgress'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import ContributionGraph from '@/components/ContributionGraph'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main
        style={{
          paddingTop: '56px',
          maxWidth: '900px',
          margin: '0 auto',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
        }}
      >
        <Hero />
        <About />
        <Skills />
        <Projects />
        <ContributionGraph />
      </main>
      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem',
        }}
      >
        <Footer />
      </div>
    </>
  )
}
