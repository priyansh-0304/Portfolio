import { forwardRef } from 'react';

const variants = {
  primary: `
    bg-violet-600 text-white
    hover:bg-violet-700
    active:bg-violet-800
    shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40
  `,
  secondary: `
    bg-transparent text-violet-600
    border-2 border-violet-500
    hover:bg-violet-50
    active:bg-violet-100
    dark:text-violet-400 dark:border-violet-400
    dark:hover:bg-violet-950/50
  `,
  ghost: `
    backdrop-blur-xl bg-white/70 dark:bg-white/5 text-slate-700
    border border-slate-200/50 dark:border-white/10
    hover:bg-white/90 dark:hover:bg-white/10 hover:border-violet-300 dark:hover:border-violet-500/50
    active:bg-white dark:active:bg-white/15
    dark:text-slate-300
  `,
  accent: `
    bg-violet-500 text-white
    hover:bg-violet-600
    active:bg-violet-700
    shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40
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
    focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:ring-offset-2
    dark:focus:ring-offset-[#0c0a1d]
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
