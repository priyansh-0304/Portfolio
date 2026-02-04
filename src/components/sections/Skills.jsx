import { useState, useEffect, useRef } from "react";
import { skillsData } from "../../data";
import { Container, SectionHeader, Card } from "../ui";
import { MonitorIcon, ServerIcon, ToolsIcon } from "../icons";

// Custom Brain icon for ML
function BrainIcon({ className = "w-6 h-6" }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  );
}

const categoryIcons = {
  monitor: MonitorIcon,
  server: ServerIcon,
  tools: ToolsIcon,
  brain: BrainIcon,
};

const colorVariants = {
  indigo: {
    bg: "bg-violet-500",
    bgLight: "bg-violet-100 dark:bg-violet-900/30",
    text: "text-violet-600 dark:text-violet-400",
    gradient: "from-violet-500 to-violet-600",
    bar: "from-violet-500 via-violet-400 to-violet-600",
    glow: "shadow-violet-500/25",
  },
  teal: {
    bg: "bg-rose-500",
    bgLight: "bg-rose-100 dark:bg-rose-900/30",
    text: "text-rose-600 dark:text-rose-400",
    gradient: "from-rose-500 to-rose-600",
    bar: "from-rose-500 via-rose-400 to-rose-600",
    glow: "shadow-rose-500/25",
  },
  rose: {
    bg: "bg-amber-500",
    bgLight: "bg-amber-100 dark:bg-amber-900/30",
    text: "text-amber-600 dark:text-amber-400",
    gradient: "from-amber-500 to-amber-600",
    bar: "from-amber-500 via-amber-400 to-amber-600",
    glow: "shadow-amber-500/25",
  },
  amber: {
    bg: "bg-slate-500",
    bgLight: "bg-slate-100 dark:bg-slate-900/30",
    text: "text-slate-600 dark:text-slate-400",
    gradient: "from-slate-500 to-slate-600",
    bar: "from-slate-500 via-slate-400 to-slate-600",
    glow: "shadow-slate-500/25",
  },
};

export default function Skills() {
  const [activeTab, setActiveTab] = useState("frontend");
  const categories = Object.entries(skillsData);

  return (
    <section id="skills" className="py-24 section-light">
      <Container>
        <SectionHeader
          subtitle="What I Do"
          title="Skills & Expertise"
          description="Technologies and tools I work with to bring ideas to life"
        />

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(([key, category]) => {
            const IconComponent = categoryIcons[category.icon];
            const colors = colorVariants[category.color];
            const isActive = activeTab === key;

            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  isActive
                    ? `bg-gradient-to-r ${colors.gradient} text-white shadow-lg ${colors.glow}`
                    : "backdrop-blur-xl bg-white/70 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:bg-white/90 dark:hover:bg-white/10"
                }`}
              >
                <IconComponent className="w-5 h-5" />
                <span>{category.title}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Display */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Progress Bars Card */}
          <Card variant="elevated" className="p-8">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-violet-500" />
              Proficiency Levels
            </h3>
            <div className="space-y-6">
              {skillsData[activeTab].skills.map((skill, index) => (
                <AnimatedSkillBar
                  key={skill.name}
                  skill={skill}
                  color={skillsData[activeTab].color}
                  delay={index * 100}
                />
              ))}
            </div>
          </Card>

          {/* Skills Grid Card */}
          <Card variant="elevated" className="p-8">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-violet-500" />
              Tech Stack
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {skillsData[activeTab].skills.map((skill, index) => (
                <SkillBadge
                  key={skill.name}
                  skill={skill}
                  color={skillsData[activeTab].color}
                  delay={index * 50}
                />
              ))}
            </div>

            {/* Stats */}
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10">
              <div className="grid grid-cols-3 gap-4 text-center">
                <StatItem
                  value={skillsData[activeTab].skills.length}
                  label="Skills"
                />
                <StatItem
                  value={Math.round(
                    skillsData[activeTab].skills.reduce((a, b) => a + b.level, 0) /
                      skillsData[activeTab].skills.length
                  )}
                  label="Avg. Level"
                  suffix="%"
                />
                <StatItem
                  value={skillsData[activeTab].skills.filter((s) => s.level >= 85).length}
                  label="Expert In"
                />
              </div>
            </div>
          </Card>
        </div>

        {/* All Skills Overview */}
        <div className="mt-12">
          <Card variant="glass" className="p-8">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 text-center">
              Complete Tech Arsenal
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {categories.flatMap(([_, category]) =>
                category.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="px-4 py-2 backdrop-blur-xl bg-white/70 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 rounded-full text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-violet-100 dark:hover:bg-violet-900/30 hover:text-violet-700 dark:hover:text-violet-300 hover:border-violet-300 dark:hover:border-violet-500/50 transition-colors cursor-default"
                  >
                    {skill.icon} {skill.name}
                  </span>
                ))
              )}
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
}

function AnimatedSkillBar({ skill, color, delay }) {
  const [width, setWidth] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const barRef = useRef(null);
  const colors = colorVariants[color];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          setTimeout(() => {
            setWidth(skill.level);
          }, delay);
        }
      },
      { threshold: 0.1 }
    );

    if (barRef.current) {
      observer.observe(barRef.current);
    }

    return () => observer.disconnect();
  }, [skill.level, delay, isVisible]);

  return (
    <div ref={barRef} className="group">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">{skill.icon}</span>
          <span className="text-slate-700 dark:text-slate-300 font-medium group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
            {skill.name}
          </span>
        </div>
        <span className={`text-sm font-bold font-mono ${colors.text}`}>
          {width}%
        </span>
      </div>
      <div className="h-3 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${colors.bar} rounded-full transition-all duration-1000 ease-out relative`}
          style={{ width: `${width}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 animate-shimmer" />
        </div>
      </div>
    </div>
  );
}

function SkillBadge({ skill, color, delay }) {
  const [isVisible, setIsVisible] = useState(false);
  const badgeRef = useRef(null);
  const colors = colorVariants[color];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (badgeRef.current) {
      observer.observe(badgeRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={badgeRef}
      className={`relative p-4 rounded-xl backdrop-blur-xl bg-white/70 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 hover:border-violet-300 dark:hover:border-violet-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/10 hover:-translate-y-1 cursor-default ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="text-2xl mb-2">{skill.icon}</div>
      <div className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
        {skill.name}
      </div>
      <div className={`text-xs font-mono ${colors.text}`}>{skill.level}%</div>
      
      {/* Level indicator */}
      <div className="absolute top-2 right-2">
        {skill.level >= 90 && (
          <span className="text-xs px-2 py-0.5 bg-violet-500 text-white rounded-full font-bold">
            PRO
          </span>
        )}
      </div>
    </div>
  );
}

function StatItem({ value, label, suffix = "" }) {
  return (
    <div>
      <div className="text-2xl font-bold text-slate-900 dark:text-white">
        {value}{suffix}
      </div>
      <div className="text-sm text-slate-500 dark:text-slate-400">{label}</div>
    </div>
  );
}
