const variants = {
  primary: 'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
  secondary: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
  accent: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  surface: 'backdrop-blur-xl bg-white/70 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-white/10',
  outline: 'bg-transparent border border-violet-300 text-violet-600 dark:border-violet-500/50 dark:text-violet-400',
};

const sizes = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-1.5 text-base',
};

export default function Badge({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
  ...props
}) {
  return (
    <span
      className={`
        inline-flex items-center
        font-medium rounded-full
        transition-colors duration-200
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `.replace(/\s+/g, ' ').trim()}
      {...props}
    >
      {icon && <span className="mr-1.5 -ml-0.5">{icon}</span>}
      {children}
    </span>
  );
}
