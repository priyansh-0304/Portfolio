import { forwardRef } from 'react';

const variants = {
  primary: `
    bg-orange-500 text-white
    hover:bg-orange-600
    active:bg-orange-700
    shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40
    dark:bg-orange-500 dark:hover:bg-orange-400
  `,
  secondary: `
    bg-transparent text-orange-600
    border-2 border-orange-500
    hover:bg-orange-50
    active:bg-orange-100
    dark:text-orange-400 dark:border-orange-400
    dark:hover:bg-orange-950/50
  `,
  ghost: `
    bg-stone-100 text-stone-700
    border border-stone-300
    hover:bg-stone-200 hover:border-stone-400
    active:bg-stone-300
    dark:bg-transparent dark:text-stone-300 dark:border-stone-600
    dark:hover:bg-stone-800 dark:hover:border-stone-500
  `,
  accent: `
    bg-amber-500 text-white
    hover:bg-amber-600
    active:bg-amber-700
    shadow-lg
    dark:bg-amber-500 dark:hover:bg-amber-400
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
    focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:ring-offset-2
    dark:focus:ring-offset-stone-900
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
