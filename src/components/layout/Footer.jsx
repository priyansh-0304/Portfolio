import { personalInfo } from "../../data";
import { Container } from "../ui";
import { GitHubIcon, LinkedInIcon, ArrowUpIcon } from "../icons";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-stone-100 dark:bg-stone-900 text-stone-900 dark:text-white py-16">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <a 
              href="#home" 
              className="text-2xl font-bold text-orange-600 dark:text-orange-400 hover:text-orange-500 dark:hover:text-orange-300 transition-colors"
            >
              PA<span className="text-gradient">.</span>
            </a>
            <p className="text-stone-600 dark:text-stone-400 mt-2">
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
        <div className="text-center mt-12 pt-8 border-t border-stone-200 dark:border-stone-800">
          <a
            href="#home"
            className="inline-flex items-center gap-2 px-4 py-2 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200 dark:hover:bg-stone-800 rounded-xl transition-all duration-200 group"
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
      className="p-3 bg-stone-200 dark:bg-stone-800 hover:bg-orange-600 rounded-xl text-stone-600 dark:text-stone-400 hover:text-white transition-all duration-200 hover:scale-110 hover:shadow-glow"
      aria-label={label}
    >
      {children}
    </a>
  );
}
