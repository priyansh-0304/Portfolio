import { ThemeProvider } from './context/ThemeContext';
import { Navbar, Footer } from './components/layout';
import { Hero, About, Projects, Skills, Contact } from './components/sections';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[#d8d3e5] dark:bg-[#0c0a1d] transition-colors duration-300">
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
