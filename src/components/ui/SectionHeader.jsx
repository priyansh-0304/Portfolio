import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function SectionHeader({
  title,
  subtitle,
  description,
  align = 'center',
  className = '',
  animated = true,
}) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const decoratorAlignment = {
    left: 'mr-auto',
    center: 'mx-auto',
    right: 'ml-auto',
  };

  return (
    <div 
      ref={animated ? ref : undefined}
      className={`mb-16 ${alignmentClasses[align]} ${className}`}
    >
      {subtitle && (
        <p 
          className={`text-indigo-500 dark:text-indigo-400 font-semibold text-sm uppercase tracking-wider mb-3 transition-all duration-500 ${
            !animated || isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {subtitle}
        </p>
      )}
      <h2 
        className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-4 transition-all duration-500 delay-100 ${
          !animated || isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        {title}
      </h2>
      <div 
        className={`w-20 h-1.5 bg-gradient-to-r from-indigo-500 to-rose-500 rounded-full ${decoratorAlignment[align]} transition-all duration-700 delay-200 ${
          !animated || isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
        }`} 
      />
      {description && (
        <p 
          className={`mt-6 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed transition-all duration-500 delay-300 ${
            !animated || isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
