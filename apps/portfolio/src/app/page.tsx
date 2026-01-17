// Header is provided by the shared DemoLayout
import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import Quality from '@/components/Quality';
import Experience from '@/components/Experience';
import Portfolio from '@/components/Portfolio';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <>

        <Hero />
        <Skills />
        <Quality />
        <Experience />
        <Portfolio />
        <Contact />
    </>
  );
}
