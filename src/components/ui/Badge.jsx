const variants = {
  primary: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  secondary: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  accent: 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
  surface: 'bg-stone-100 text-stone-700 dark:bg-stone-700 dark:text-stone-300',
  outline: 'bg-transparent border border-stone-300 text-stone-600 dark:border-stone-600 dark:text-stone-400',
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
