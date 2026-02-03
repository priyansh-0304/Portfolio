import { aboutData, personalInfo } from "../../data";
import { Container, SectionHeader, Card, AnimatedSection } from "../ui";
import { CheckIcon, MailIcon, LocationIcon } from "../icons";
import { useScrollReveal, useStaggeredReveal } from "../../hooks";

export default function About() {
  const imageReveal = useScrollReveal({ threshold: 0.2 });
  const contentReveal = useScrollReveal({ threshold: 0.2, delay: 200 });
  const { containerRef, isItemVisible } = useStaggeredReveal(
    aboutData.highlights.length,
    100,
    { threshold: 0.2 }
  );

  return (
    <section id="about" className="py-24 section-light">
      <Container>
        <SectionHeader
          subtitle="Get to know me"
          title="About Me"
          description="Passionate about building scalable applications and solving complex problems"
        />

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image / Avatar */}
          <div 
            ref={imageReveal.ref}
            className={`relative group transition-all duration-700 ${
              imageReveal.isVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="w-72 h-72 sm:w-80 sm:h-80 mx-auto relative">
              {/* Decorative background */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-rose-500 rounded-3xl transform rotate-6 group-hover:rotate-12 transition-transform duration-500" />
              {/* Main container */}
              <Card 
                variant="elevated" 
                padding="none"
                className="absolute inset-0 rounded-3xl overflow-hidden"
              >
                <img 
                    src="/img.jpeg" 
                    alt="Priyansh Arora"
                    className="w-full h-full object-cover"
                />
              </Card>
              {/* Floating badge *
              <div className="absolute -bottom-4 -right-4 px-4 py-2 bg-teal-500 text-white rounded-xl shadow-lg font-semibold animate-float">
                360+ DSA
              </div>
              */}
            </div>
          </div>

          {/* Content */}
          <div 
            ref={contentReveal.ref}
            className={`space-y-6 transition-all duration-700 delay-200 ${
              contentReveal.isVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-8'
            }`}
          >
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              {personalInfo.title}
            </h3>
            
            <div className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line text-lg">
              {aboutData.bio}
            </div>

            {/* Highlights */}
            <div ref={containerRef} className="grid grid-cols-2 gap-4 py-4">
              {aboutData.highlights.map((highlight, index) => (
                <div 
                  key={index} 
                  className={`flex items-center gap-3 p-3 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-indigo-100 dark:hover:bg-indigo-950/30 transition-all duration-500 group hover-lift ${
                    isItemVisible(index) 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-900/40 flex items-center justify-center group-hover:bg-teal-200 dark:group-hover:bg-teal-800/40 transition-colors">
                    <CheckIcon className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  </div>
                  <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>

            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <a 
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group"
              >
                <MailIcon className="w-5 h-5 text-indigo-500 group-hover:scale-110 transition-transform" />
                <span>{personalInfo.email}</span>
              </a>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <LocationIcon className="w-5 h-5 text-indigo-500" />
                <span>{personalInfo.location}</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
