import { CursorEffects } from '@/components/CursorEffects';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { About } from '@/sections/About';
import { Contacts } from '@/sections/Contacts';
import { Hero } from '@/sections/Hero';
import { Projects } from '@/sections/Projects';
import { Skills } from '@/sections/Skills';

import styles from './App.module.scss';

export const App = () => (
  <>
    <Header />
    <main className={styles.main}>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contacts />
    </main>
    <Footer />
    <CursorEffects />
  </>
);
