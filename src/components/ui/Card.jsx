import { forwardRef } from 'react';

const variants = {
  default: `
    bg-slate-50 dark:bg-white/5
    border border-slate-200/50 dark:border-white/10
  `,
  elevated: `
    bg-slate-50 dark:bg-white/5
    shadow-lg hover:shadow-xl
    dark:shadow-violet-900/10
  `,
  glass: `
    backdrop-blur-xl bg-white/70 dark:bg-white/5
    border border-slate-200/50 dark:border-white/10
  `,
  gradient: `
    bg-gradient-to-br from-slate-50 to-violet-50
    dark:from-white/5 dark:to-violet-900/10
    border border-slate-200/50 dark:border-white/10
  `,
  interactive: `
    bg-slate-50 dark:bg-white/5
    shadow-lg hover:shadow-xl
    dark:shadow-violet-900/10
    cursor-pointer
  `,
};

const paddings = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-10',
};

const Card = forwardRef(({
  children,
  variant = 'elevated',
  padding = 'md',
  className = '',
  hover = false,
  hoverEffect = 'lift', // 'lift' | 'glow' | 'scale' | 'none'
  as: Component = 'div',
  ...props
}, ref) => {
  const baseStyles = `
    rounded-2xl
    transition-all duration-300 ease-out
    overflow-hidden
  `;

  const hoverEffects = {
    lift: 'hover:-translate-y-1 hover:shadow-xl',
    glow: 'hover:shadow-lg hover:shadow-violet-500/10 hover:border-violet-200 dark:hover:border-violet-500/30',
    scale: 'hover:scale-[1.02]',
    none: '',
  };

  const hoverStyles = hover ? hoverEffects[hoverEffect] || hoverEffects.lift : '';

  return (
    <Component
      ref={ref}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${paddings[padding]}
        ${hoverStyles}
        ${className}
      `.replace(/\s+/g, ' ').trim()}
      {...props}
    >
      {children}
    </Component>
  );
});

Card.displayName = 'Card';

// Card subcomponents for composition
const CardHeader = forwardRef(({ children, className = '', ...props }, ref) => (
  <div
    ref={ref}
    className={`mb-4 ${className}`}
    {...props}
  >
    {children}
  </div>
));
CardHeader.displayName = 'CardHeader';

const CardTitle = forwardRef(({ children, className = '', as: Component = 'h3', ...props }, ref) => (
  <Component
    ref={ref}
    className={`text-xl font-bold text-slate-900 dark:text-white ${className}`}
    {...props}
  >
    {children}
  </Component>
));
CardTitle.displayName = 'CardTitle';

const CardDescription = forwardRef(({ children, className = '', ...props }, ref) => (
  <p
    ref={ref}
    className={`text-slate-600 dark:text-slate-400 ${className}`}
    {...props}
  >
    {children}
  </p>
));
CardDescription.displayName = 'CardDescription';

const CardContent = forwardRef(({ children, className = '', ...props }, ref) => (
  <div
    ref={ref}
    className={className}
    {...props}
  >
    {children}
  </div>
));
CardContent.displayName = 'CardContent';

const CardFooter = forwardRef(({ children, className = '', ...props }, ref) => (
  <div
    ref={ref}
    className={`mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 ${className}`}
    {...props}
  >
    {children}
  </div>
));
CardFooter.displayName = 'CardFooter';

// Image component for cards
const CardImage = forwardRef(({ src, alt, className = '', overlay = false, ...props }, ref) => (
  <div ref={ref} className={`relative overflow-hidden ${className}`} {...props}>
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
    />
    {overlay && (
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    )}
  </div>
));
CardImage.displayName = 'CardImage';

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;
Card.Image = CardImage;

export default Card;
