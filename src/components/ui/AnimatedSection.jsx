import { useScrollReveal } from '../../hooks/useScrollReveal';

/**
 * Animated Section Wrapper
 * Applies scroll-triggered reveal animations to section content
 */
export function AnimatedSection({
  children,
  className = '',
  animation = 'up', // 'up' | 'left' | 'right' | 'scale' | 'blur'
  delay = 0,
  threshold = 0.1,
  as: Component = 'div',
  ...props
}) {
  const { ref, isVisible } = useScrollReveal({
    threshold,
    delay,
    triggerOnce: true,
  });

  const animationClass = {
    up: 'reveal-up',
    left: 'reveal-left',
    right: 'reveal-right',
    scale: 'reveal-scale',
    blur: 'reveal-blur',
    none: 'reveal',
  }[animation] || 'reveal-up';

  return (
    <Component
      ref={ref}
      className={`${animationClass} ${isVisible ? 'visible' : ''} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}

/**
 * Animated Grid Item
 * For staggered grid animations
 */
export function AnimatedItem({
  children,
  className = '',
  index = 0,
  isVisible = false,
  animation = 'up',
  ...props
}) {
  const animationClass = {
    up: 'reveal-up',
    left: 'reveal-left',
    right: 'reveal-right',
    scale: 'reveal-scale',
  }[animation] || 'reveal-up';

  return (
    <div
      className={`${animationClass} ${isVisible ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${index * 100}ms` }}
      {...props}
    >
      {children}
    </div>
  );
}

export default AnimatedSection;
