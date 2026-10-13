import React, { useRef } from 'react';
import gsap from 'gsap';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
  as?: 'button' | 'a';
  href?: string;
  target?: string;
  rel?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  variant = 'primary',
  as = 'button',
  href,
  target,
  rel,
  onClick,
  ...props
}) => {
  const btnRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = btnRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(el, {
      x: x * 0.22,
      y: y * 0.22,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    const el = btnRef.current;
    if (!el) return;
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.4,
      ease: 'elastic.out(1, 0.4)',
    });
  };

  const baseStyles =
    'relative inline-flex items-center justify-center rounded-[4px] text-xs uppercase font-bold tracking-wider transition-colors duration-200 select-none';

  const variantStyles =
    variant === 'primary'
      ? 'bg-[#C9972E] hover:bg-[#E6BF63] text-[#1C2B52] shadow-sm'
      : 'border border-[#1C2B52] text-[#1C2B52] hover:bg-[#1C2B52] hover:text-[#F8F5EE]';

  const combinedClasses = `${baseStyles} ${variantStyles} ${className}`;

  if (as === 'a' && href) {
    return (
      <a
        ref={btnRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={combinedClasses}
        onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={btnRef as React.RefObject<HTMLButtonElement>}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={combinedClasses}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};
