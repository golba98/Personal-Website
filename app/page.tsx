import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import ContributionGraph from '@/components/ContributionGraph'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
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
        <Experience />
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
