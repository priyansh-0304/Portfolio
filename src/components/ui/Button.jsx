import { forwardRef } from 'react';

const variants = {
  primary: `
    bg-indigo-500 text-white
    hover:bg-indigo-600
    active:bg-indigo-700
    shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40
    dark:bg-indigo-500 dark:hover:bg-indigo-400
  `,
  secondary: `
    bg-transparent text-indigo-600
    border-2 border-indigo-500
    hover:bg-indigo-50
    active:bg-indigo-100
    dark:text-indigo-400 dark:border-indigo-400
    dark:hover:bg-indigo-950/50
  `,
  ghost: `
    bg-slate-100 text-slate-700
    border border-slate-300
    hover:bg-slate-200 hover:border-slate-400
    active:bg-slate-300
    dark:bg-transparent dark:text-slate-300 dark:border-slate-600
    dark:hover:bg-slate-800 dark:hover:border-slate-500
  `,
  accent: `
    bg-teal-500 text-white
    hover:bg-teal-600
    active:bg-teal-700
    shadow-lg
    dark:bg-teal-500 dark:hover:bg-teal-400
  `,
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
  xl: 'px-10 py-5 text-xl',
};

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
  iconPosition = 'left',
  fullWidth = false,
  disabled = false,
  loading = false,
  as: Component = 'button',
  ...props
}, ref) => {
  const baseStyles = `
    inline-flex items-center justify-center
    font-semibold rounded-xl
    transition-all duration-300 ease-out
    transform hover:-translate-y-0.5
    focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2
    dark:focus:ring-offset-slate-900
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-none
  `;

  const widthStyles = fullWidth ? 'w-full' : '';

  return (
    <Component
      ref={ref}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${widthStyles}
        ${className}
      `.replace(/\s+/g, ' ').trim()}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {icon && iconPosition === 'left' && !loading && (
        <span className="mr-2 -ml-1">{icon}</span>
      )}
      {children}
      {icon && iconPosition === 'right' && (
        <span className="ml-2 -mr-1">{icon}</span>
      )}
    </Component>
  );
});

Button.displayName = 'Button';

export default Button;
