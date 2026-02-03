import { ThemeProvider } from './context/ThemeContext';
import { Navbar, Footer } from './components/layout';
import { Hero, About, Projects, Skills, Contact } from './components/sections';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-slate-300 dark:bg-stone-900 transition-colors duration-300">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
