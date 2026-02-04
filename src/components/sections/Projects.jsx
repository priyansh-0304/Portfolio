import { useState, useMemo, useEffect, useRef } from "react";
import projectsJson from "../../data/projects.json";
import { Container, SectionHeader, Card, Badge, Button } from "../ui";
import { GitHubIcon, ExternalLinkIcon } from "../icons";
import { useScrollReveal } from "../../hooks";

const { projects } = projectsJson;

// Extract unique tech stack items for filtering
const allTechStack = [...new Set(projects.flatMap((p) => p.techStack))].sort();

// Close icon component
function CloseIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

// Calendar icon component
function CalendarIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((p) => p.techStack.includes(activeFilter));
  }, [activeFilter]);

  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 4);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    if (selectedProject) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  return (
    <section id="projects" className="py-24 section-alt">
      <Container>
        <SectionHeader
          subtitle="My Work"
          title="Featured Projects"
          description="Here are some of my recent projects. Each one was built with care and attention to detail."
        />

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <FilterButton
            active={activeFilter === "All"}
            onClick={() => setActiveFilter("All")}
          >
            All
          </FilterButton>
          {allTechStack.map((tech) => (
            <FilterButton
              key={tech}
              active={activeFilter === tech}
              onClick={() => setActiveFilter(tech)}
            >
              {tech}
            </FilterButton>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {displayedProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              No projects found with "{activeFilter}"
            </p>
            <button
              onClick={() => setActiveFilter("All")}
              className="mt-4 text-violet-600 dark:text-violet-400 font-medium hover:underline"
            >
              Clear filter
            </button>
          </div>
        )}

        {/* Show More/Less Button */}
        {filteredProjects.length > 4 && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 font-semibold hover:border-violet-500 dark:hover:border-violet-500 hover:text-violet-600 dark:hover:text-violet-400 transition-all duration-300"
            >
              {showAll ? (
                <>
                  Show Less
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </>
              ) : (
                <>
                  Show More ({filteredProjects.length - 4} more)
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </>
              )}
            </button>
          </div>
        )}
      </Container>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}

function FilterButton({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
        active
          ? "bg-violet-600 text-white shadow-lg shadow-violet-500/25"
          : "backdrop-blur-xl bg-white/70 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:bg-white/90 dark:hover:bg-white/10 hover:text-violet-600 dark:hover:text-violet-400"
      }`}
    >
      {children}
    </button>
  );
}

function ProjectCard({ project, index, onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1, triggerOnce: true });

  const handleLinkClick = (e) => {
    e.stopPropagation();
  };

  // Alternate left/right animation based on index
  const isFromLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className="group relative cursor-pointer transition-all duration-700 ease-out"
      style={{ 
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateX(0)' : `translateX(${isFromLeft ? '-50px' : '50px'})`,
        transitionDelay: `${(index % 2) * 150}ms`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Glow shadow effect behind card */}
      <div 
        className={`absolute -inset-1 rounded-2xl bg-violet-500/0 group-hover:bg-violet-500/20 blur-xl transition-all duration-500 dark:group-hover:bg-violet-500/30`}
      />
      
      {/* Card content */}
      <Card
        variant="elevated"
        padding="none"
        className="relative overflow-hidden transform transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl dark:border dark:border-white/10 dark:group-hover:border-violet-500/40"
      >
        {/* Project Image */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className={`w-full h-full object-cover transition-all duration-700 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          />

          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-4 left-4 z-10">
              <span className="px-3 py-1 bg-violet-600 text-white text-xs font-semibold rounded-full shadow-lg">
                Featured
              </span>
            </div>
          )}

          {/* Overlay with links */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/60 to-transparent flex flex-col items-center justify-center gap-4 transition-all duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex gap-4">
              <ProjectLink
                href={project.githubLink}
                icon={<GitHubIcon className="w-5 h-5" />}
                label="View Code"
                onClick={handleLinkClick}
                disabled={!project.githubLink || project.githubLink === "#"}
              />
              <ProjectLink
                href={project.demoLink}
                icon={<ExternalLinkIcon className="w-5 h-5" />}
                label="Live Demo"
                onClick={handleLinkClick}
                disabled={!project.demoLink || project.demoLink === "#"}
              />
            </div>
          </div>
        </div>

        {/* Project Info */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-5 line-clamp-2">
            {project.shortDescription}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Badge
                key={tech}
                variant="primary"
                size="sm"
                className="transition-all duration-200 hover:scale-105 hover:bg-violet-600 hover:text-white dark:hover:bg-violet-500/20 dark:hover:text-violet-400"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

function ProjectLink({ href, icon, label, onClick, disabled }) {
  if (disabled) {
    return (
      <span
        className="flex items-center gap-2 px-4 py-2 bg-slate-600/80 dark:bg-slate-700/80 rounded-xl cursor-not-allowed"
      >
        <span className="text-slate-300 dark:text-slate-500">
          {icon}
        </span>
        <span className="text-sm font-medium text-slate-300 dark:text-slate-500">
          {label}
        </span>
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className="group/link flex items-center gap-2 px-4 py-2 bg-slate-200/95 dark:bg-slate-800/95 rounded-xl hover:bg-violet-600 transition-all duration-200 hover:scale-105 shadow-lg"
    >
      <span className="text-slate-900 dark:text-white group-hover/link:text-white transition-colors">
        {icon}
      </span>
      <span className="text-sm font-medium text-slate-900 dark:text-white group-hover/link:text-white transition-colors">
        {label}
      </span>
    </a>
  );
}

function ProjectModal({ project, onClose }) {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" 
        style={{ animation: 'fade-in 0.3s ease-out forwards' }}
      />
      
      {/* Modal Content */}
      <div 
        className="relative w-full max-w-3xl bg-slate-100 dark:bg-[#0c0a1d] rounded-2xl shadow-2xl border border-slate-200/50 dark:border-white/10"
        style={{ animation: 'modal-rise-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-xl bg-slate-200/90 dark:bg-slate-800/90 text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-all duration-200"
          aria-label="Close modal"
        >
          <CloseIcon className="w-5 h-5" />
        </button>

        {/* Project Image */}
        <div className="relative h-48 sm:h-56 overflow-hidden rounded-t-2xl">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
          
          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-4 left-4">
              <span className="px-4 py-1.5 bg-violet-600 text-white text-sm font-semibold rounded-full shadow-lg">
                Featured Project
              </span>
            </div>
          )}
        </div>

        {/* Project Details */}
        <div className="p-5 sm:p-6">
          {/* Title & Date */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {project.title}
            </h2>
            {project.date && (
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                <CalendarIcon className="w-4 h-4" />
                <span>{project.date}</span>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed mb-5">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="mb-5">
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge
                  key={tech}
                  variant="primary"
                  size="md"
                  className="transition-transform duration-200 hover:scale-105"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-5 border-t border-slate-200 dark:border-white/10">
            <Button
              as={project.githubLink && project.githubLink !== "#" ? "a" : "button"}
              href={project.githubLink && project.githubLink !== "#" ? project.githubLink : undefined}
              target={project.githubLink && project.githubLink !== "#" ? "_blank" : undefined}
              rel={project.githubLink && project.githubLink !== "#" ? "noopener noreferrer" : undefined}
              variant="secondary"
              size="md"
              icon={<GitHubIcon className="w-5 h-5" />}
              className={`flex-1 justify-center ${!project.githubLink || project.githubLink === "#" ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={!project.githubLink || project.githubLink === "#"}
            >
              View Source Code
            </Button>
            <Button
              as={project.demoLink && project.demoLink !== "#" ? "a" : "button"}
              href={project.demoLink && project.demoLink !== "#" ? project.demoLink : undefined}
              target={project.demoLink && project.demoLink !== "#" ? "_blank" : undefined}
              rel={project.demoLink && project.demoLink !== "#" ? "noopener noreferrer" : undefined}
              variant="primary"
              size="md"
              icon={<ExternalLinkIcon className="w-5 h-5" />}
              className={`flex-1 justify-center ${!project.demoLink || project.demoLink === "#" ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={!project.demoLink || project.demoLink === "#"}
            >
              Live Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
