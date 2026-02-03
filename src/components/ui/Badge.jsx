const variants = {
  primary: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
  secondary: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
  accent: 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300',
  surface: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300',
  outline: 'bg-transparent border border-slate-300 text-slate-600 dark:border-slate-600 dark:text-slate-400',
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
