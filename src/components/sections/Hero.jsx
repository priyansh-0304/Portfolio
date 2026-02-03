import { useEffect, useState } from "react";
import { personalInfo } from "../../data";
import { Button, Container } from "../ui";
import { ChevronDownIcon, ArrowRightIcon, DownloadIcon } from "../icons";

const roles = ["Full-Stack Developer", "React.js Developer", "Problem Solver", "AI/ML Enthusiast"];

export default function Hero() {
  const [currentRole, setCurrentRole] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 bg-slate-300 dark:bg-slate-950">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.05]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-300 dark:to-slate-950" />
      </div>

      {/* Floating Orbs - Subtle */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-[10%] w-64 h-64 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full filter blur-3xl animate-float" />
        <div className="absolute top-1/2 right-[10%] w-80 h-80 bg-teal-500/10 dark:bg-teal-500/5 rounded-full filter blur-3xl animate-float animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-rose-500/10 dark:bg-rose-500/5 rounded-full filter blur-3xl animate-float animation-delay-4000" />
      </div>

      {/* Gradient Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

      <Container className="relative py-20">
        <div className="max-w-4xl mx-auto">
          {/* Status Badge */}
          <div 
            className={`flex justify-center mb-8 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                Available for new projects
              </span>
            </div>
          </div>

          {/* Main Content */}
          <div className="text-center">
            {/* Greeting */}
            <p 
              className={`text-slate-500 dark:text-slate-400 font-mono text-sm tracking-wider mb-4 transition-all duration-700 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              {"<hello world />"}
            </p>

            {/* Name */}
            <h1 
              className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 dark:text-white mb-4 transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              I'm{" "}
              <span className="relative">
                <span className="text-gradient">{personalInfo.name}</span>
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 5.5C47.6667 2.16667 154.4 -2.4 199 5.5"
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="animate-draw"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="200" y2="0">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="50%" stopColor="#f43f5e" />
                      <stop offset="100%" stopColor="#14b8a6" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>

            {/* Animated Role */}
            <div 
              className={`h-12 sm:h-14 mb-6 overflow-hidden transition-all duration-700 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <h2 className="text-xl sm:text-2xl lg:text-3xl text-slate-600 dark:text-slate-300 font-medium">
                <span className="text-slate-400 dark:text-slate-500">{"{"}</span>
                <span 
                  key={currentRole}
                  className="inline-block animate-role-fade text-indigo-600 dark:text-indigo-400"
                >
                  {" "}{roles[currentRole]}{" "}
                </span>
                <span className="text-slate-400 dark:text-slate-500">{"}"}</span>
              </h2>
            </div>

            {/* Professional Intro */}
            <p 
              className={`text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-700 delay-400 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              B.Tech IT student building full-stack applications with 
              <span className="text-slate-700 dark:text-slate-200 font-medium"> React.js, Spring Boot </span> 
              and 
              <span className="text-slate-700 dark:text-slate-200 font-medium"> AI/ML technologies</span>. 
              Focused on creating scalable, production-ready web applications.
            </p>

            {/* CTA Buttons */}
            <div 
              className={`flex flex-col sm:flex-row gap-4 justify-center mb-12 transition-all duration-700 delay-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <Button
                as="a"
                href="#projects"
                size="lg"
                icon={<ArrowRightIcon className="w-5 h-5" />}
                iconPosition="right"
                className="group"
              >
                View My Work
              </Button>
              <Button
                as="a"
                href="#contact"
                variant="secondary"
                size="lg"
              >
                Get In Touch
              </Button>
              <Button
                as="a"
                href="/Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost"
                size="lg"
                icon={<DownloadIcon className="w-5 h-5" />}
              >
                Resume
              </Button>
            </div>

            {/* Tech Stack Preview */}
            <div 
              className={`transition-all duration-700 delay-[600ms] ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <p className="text-xs font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">
                Tech I Work With
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {["React.js", "Spring Boot", "Node.js", "Python", "PostgreSQL"].map((tech) => (
                  <span 
                    key={tech}
                    className="px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div 
            className={`mt-16 text-center transition-all duration-700 delay-700 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <a 
              href="#about" 
              className="inline-flex flex-col items-center gap-2 text-slate-400 dark:text-slate-500 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors group"
              aria-label="Scroll to about section"
            >
              <span className="text-xs font-mono tracking-wider">scroll</span>
              <ChevronDownIcon className="w-5 h-5 animate-bounce" />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
