import { useState, useEffect, useCallback } from "react";
import { useTheme } from "../../context/ThemeContext";
import { navLinks } from "../../data";
import { Container } from "../ui";
import { SunIcon, MoonIcon, MenuIcon, XIcon } from "../icons";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { darkMode, toggleDarkMode } = useTheme();

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = navLinks.map(link => link.href.substring(1));
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(section);
          break;
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = useCallback((e, href) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    
    if (element) {
      const offset = 80; // Account for fixed navbar
      const elementPosition = element.offsetTop - offset;
      
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth"
      });
      
      setActiveSection(targetId);
      setIsMobileMenuOpen(false);
    }
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "glass shadow-soft py-3"
          : "bg-transparent py-4"
      }`}
    >
      <Container>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, "#home")}
            className="text-2xl font-bold text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-all duration-300 hover:scale-105"
          >
            PA<span className="text-gradient-animate">.</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  activeSection === link.href.substring(1)
                    ? "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/50"
                    : "text-stone-600 dark:text-stone-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-stone-100 dark:hover:bg-stone-800"
                }`}
              >
                {link.name}
                {activeSection === link.href.substring(1) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-orange-500 rounded-full" />
                )}
              </a>
            ))}

            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="ml-4 p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 transition-all duration-300 hover:scale-110"
              aria-label="Toggle dark mode"
            >
              <span 
                key={darkMode ? 'sun' : 'moon'}
                className="block animate-theme-toggle"
              >
                {darkMode ? (
                  <SunIcon className="w-5 h-5 text-amber-500" />
                ) : (
                  <MoonIcon className="w-5 h-5 text-stone-600" />
                )}
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 transition-all duration-300 hover:scale-105"
              aria-label="Toggle dark mode"
            >
              <span 
                key={darkMode ? 'sun-mobile' : 'moon-mobile'}
                className="block animate-theme-toggle"
              >
                {darkMode ? (
                  <SunIcon className="w-5 h-5 text-amber-500" />
                ) : (
                  <MoonIcon className="w-5 h-5 text-stone-600" />
                )}
              </span>
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 transition-all duration-300"
              aria-label="Toggle menu"
            >
              <span className={`block transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-90' : ''}`}>
                {isMobileMenuOpen ? (
                  <XIcon className="w-5 h-5 text-stone-700 dark:text-stone-300" />
                ) : (
                  <MenuIcon className="w-5 h-5 text-stone-700 dark:text-stone-300" />
                )}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
            isMobileMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="p-4 glass rounded-2xl shadow-soft-lg">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`block py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                  activeSection === link.href.substring(1)
                    ? "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/50"
                    : "text-stone-700 dark:text-stone-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-stone-100 dark:hover:bg-stone-800"
                }`}
                style={{ 
                  transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms',
                  transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-10px)',
                  opacity: isMobileMenuOpen ? 1 : 0
                }}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </nav>
  );
}
