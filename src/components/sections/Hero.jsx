import { useEffect, useState } from "react";
import { personalInfo } from "../../data";
import { Button, Container } from "../ui";
import { ChevronDownIcon, ArrowRightIcon, DownloadIcon, GitHubIcon, LinkedInIcon } from "../icons";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background - matches App.jsx */}
      <div className="absolute inset-0 bg-[#d8d3e5] dark:bg-[#0c0a1d]" />

      <Container className="relative z-20 py-20">
        <div className="max-w-3xl mx-auto">
          {/* Main Content */}
          <div className="text-center">
            {/* Status Badge - Glassmorphism */}
            <div 
              className={`flex justify-center mb-10 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl bg-white/70 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 shadow-lg shadow-violet-500/5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
                </span>
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  Open to opportunities
                </span>
              </div>
            </div>

            {/* Name - Big and Bold with Gradient */}
            <h1 
              className={`text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tighter mb-6 transition-all duration-700 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <span className="text-slate-900 dark:text-white">I'm </span>
              <span className="text-violet-600 dark:text-violet-400">
                {personalInfo.name}
              </span>
            </h1>

            {/* Divider - Gradient */}
            <div 
              className={`flex justify-center mb-8 transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
              }`}
            >
              <div className="w-16 h-1 bg-violet-500 rounded-full" />
            </div>

            {/* Value Proposition */}
            <p 
              className={`text-xl sm:text-2xl lg:text-3xl text-slate-700 dark:text-slate-300 font-medium max-w-2xl mx-auto mb-4 transition-all duration-700 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              I design & build
              <span className="text-violet-600 dark:text-violet-400"> digital products </span>
              <br />
              that people love to use.
            </p>

            {/* Sub-description */}
            <p 
              className={`text-base text-slate-500 dark:text-slate-400 max-w-xl mx-auto mb-12 transition-all duration-700 delay-400 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Full-stack developer with a focus on React, Spring Boot & AI/ML.
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
                icon={<ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                iconPosition="right"
                className="group !bg-violet-600 hover:!bg-violet-700 !text-white shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all"
              >
                View My Work
              </Button>
              <Button
                as="a"
                href="/Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="lg"
                icon={<DownloadIcon className="w-5 h-5" />}
                className="backdrop-blur-xl !bg-white/70 dark:!bg-white/5 !border-slate-200/50 dark:!border-white/10 !text-slate-700 dark:!text-slate-300 hover:!border-violet-500/50 hover:!text-violet-600 dark:hover:!text-violet-400"
              >
                Resume
              </Button>
            </div>

            {/* Social Links - Glassmorphism */}
            <div 
              className={`flex justify-center gap-4 transition-all duration-700 delay-600 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <a 
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl backdrop-blur-xl bg-white/70 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 hover:border-violet-300 dark:hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/10 transition-all hover:-translate-y-1"
                aria-label="GitHub"
              >
                <GitHubIcon className="w-5 h-5" />
              </a>
              <a 
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl backdrop-blur-xl bg-white/70 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 hover:border-violet-300 dark:hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/10 transition-all hover:-translate-y-1"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div 
            className={`mt-20 text-center transition-all duration-700 delay-700 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <a 
              href="#about" 
              className="inline-flex flex-col items-center gap-2 text-slate-400 dark:text-slate-500 hover:text-violet-500 dark:hover:text-violet-400 transition-colors group"
              aria-label="Scroll to about section"
            >
              <span className="text-xs font-mono tracking-wider uppercase">Scroll</span>
              <ChevronDownIcon className="w-5 h-5 animate-bounce" />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
