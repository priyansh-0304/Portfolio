import { personalInfo } from "../../data";
import { Container } from "../ui";
import { GitHubIcon, LinkedInIcon, ArrowUpIcon } from "../icons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#cdc7dc] dark:bg-[#0c0a1d] text-slate-900 dark:text-white py-16 relative overflow-hidden">
      {/* Subtle gradient orb */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-violet-500/10 blur-3xl pointer-events-none" />
      
      <Container className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <a 
              href="#home" 
              className="text-2xl font-bold text-violet-600 dark:text-violet-400 hover:text-violet-500 dark:hover:text-violet-300 transition-all"
            >
              PA<span className="text-violet-400 dark:text-violet-500">.</span>
            </a>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              &copy; {currentYear} {personalInfo.name}. All rights reserved.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-4">
            <SocialLink href={personalInfo.github} label="GitHub">
              <GitHubIcon className="w-5 h-5" />
            </SocialLink>
            <SocialLink href={personalInfo.linkedin} label="LinkedIn">
              <LinkedInIcon className="w-5 h-5" />
            </SocialLink>
          </div>
        </div>

        {/* Back to Top */}
        <div className="text-center mt-12 pt-8 border-t border-slate-200/50 dark:border-white/10">
          <a
            href="#home"
            className="inline-flex items-center gap-2 px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-white/5 rounded-xl transition-all duration-200 group"
          >
            <ArrowUpIcon className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            Back to Top
          </a>
        </div>
      </Container>
    </footer>
  );
}

function SocialLink({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-3 backdrop-blur-xl bg-white/70 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 hover:bg-violet-600 rounded-xl text-slate-600 dark:text-slate-400 hover:text-white hover:border-transparent transition-all duration-200 hover:scale-110"
      aria-label={label}
    >
      {children}
    </a>
  );
}
