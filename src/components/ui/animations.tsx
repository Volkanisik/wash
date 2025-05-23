
import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface FoamBubblesProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'green' | 'white';
  children?: React.ReactNode;
}

export const FoamBubbles = ({
  size = 'md',
  color = 'blue',
  className,
  children,
  ...props
}: FoamBubblesProps) => {
  const bubbleSizes = {
    sm: 'before:w-4 before:h-4 after:w-3 after:h-3',
    md: 'before:w-6 before:h-6 after:w-4 after:h-4',
    lg: 'before:w-8 before:h-8 after:w-5 after:h-5',
  };
  
  const bubbleColors = {
    blue: 'before:bg-blue-100 after:bg-blue-50',
    green: 'before:bg-green-100 after:bg-green-50',
    white: 'before:bg-white/70 after:bg-white/50',
  };
  
  return (
    <div
      className={cn(
        'relative',
        bubbleSizes[size],
        bubbleColors[color],
        'before:absolute before:rounded-full before:-top-3 before:-left-3 before:animate-foam before:opacity-70 before:z-10',
        'after:absolute after:rounded-full after:-top-1 after:left-2 after:animate-foam after:opacity-50 after:delay-200 after:z-10',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface FloatingElementProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number;
  duration?: number;
  distance?: string;
  children: React.ReactNode;
}

export const FloatingElement = ({
  delay = 0,
  duration = 6,
  distance = '10px',
  className,
  children,
  ...props
}: FloatingElementProps) => {
  return (
    <div
      className={cn('relative', className)}
      style={{
        animation: `float ${duration}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
      {...props}
    >
      <style>
        {`@keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-${distance}); }
        }`}
      </style>
      {children}
    </div>
  );
};

interface ProgressiveBlurProps extends React.HTMLAttributes<HTMLDivElement> {
  height?: string;
  direction?: 'top' | 'bottom';
  children: React.ReactNode;
}

export const ProgressiveBlur = ({
  height = '4rem',
  direction = 'bottom',
  className,
  children,
  ...props
}: ProgressiveBlurProps) => {
  return (
    <div className={cn('relative overflow-hidden', className)} {...props}>
      {children}
      <div
        className={cn(
          'absolute left-0 right-0 pointer-events-none',
          direction === 'bottom' ? 'bottom-0' : 'top-0'
        )}
        style={{
          height,
          background: `linear-gradient(to ${direction === 'bottom' ? 'top' : 'bottom'}, rgba(255,255,255,1), rgba(255,255,255,0))`,
        }}
      ></div>
    </div>
  );
};

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  opacity?: number;
  blur?: string;
  glowColor?: string;
  glowIntensity?: 'light' | 'medium' | 'strong';
  children: React.ReactNode;
}

// Enhanced GlassPanel with glowing effect support
export const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(({
  opacity = 0.7,
  blur = '8px',
  glowColor = 'rgba(255, 255, 255, 0.4)',
  glowIntensity = 'medium',
  className,
  children,
  ...props
}, ref) => {
  // Define glow intensity levels
  const glowStyles = {
    light: '0 0 15px 2px',
    medium: '0 0 25px 5px',
    strong: '0 0 35px 10px'
  };

  return (
    <div
      ref={ref}
      className={cn(
        'rounded-xl border border-white/20',
        className
      )}
      style={{
        backdropFilter: `blur(${blur})`,
        backgroundColor: `rgba(255, 255, 255, ${opacity})`,
        boxShadow: `${glowStyles[glowIntensity]} ${glowColor}`,
        transition: 'all 0.3s ease'
      }}
      {...props}
    >
      {children}
    </div>
  );
});

// Add display name for debugging purposes
GlassPanel.displayName = 'GlassPanel';

// Glass text background
interface GlassTextProps extends React.HTMLAttributes<HTMLDivElement> {
  opacity?: number;
  blur?: string;
  children: React.ReactNode;
}

export const GlassText = forwardRef<HTMLDivElement, GlassTextProps>(({
  opacity = 0.3,
  blur = '5px',
  className,
  children,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'relative px-4 py-2 rounded-lg',
        className
      )}
    >
      <div 
        className="absolute inset-0 rounded-lg z-0"
        style={{
          backdropFilter: `blur(${blur})`,
          backgroundColor: `rgba(255, 255, 255, ${opacity})`,
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
});

GlassText.displayName = 'GlassText';

// New Water Droplet component
interface WaterDropProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  duration?: number;
}

export const WaterDrop = ({
  size = 'md',
  color = 'rgba(59, 130, 246, 0.3)', // Default blue
  duration = 4,
  className,
  ...props
}: WaterDropProps) => {
  const dropSizes = {
    sm: 'w-1 h-4',
    md: 'w-1.5 h-6',
    lg: 'w-2 h-8',
  };
  
  return (
    <div
      className={cn(
        dropSizes[size],
        'rounded-b-full bg-gradient-to-b from-transparent via-current to-current',
        className
      )}
      style={{
        color,
        animation: `dropFall ${duration}s linear infinite`,
      }}
      {...props}
    >
      <style>
        {`@keyframes dropFall {
          0% { transform: translateY(-100vh); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }`}
      </style>
    </div>
  );
};

// New Splash effect component
interface SplashProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Splash = ({
  color = 'rgba(59, 130, 246, 0.4)',
  size = 'md',
  className,
  ...props
}: SplashProps) => {
  const splashSizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };
  
  return (
    <div
      className={cn(
        splashSizes[size],
        'relative',
        className
      )}
      {...props}
    >
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute top-1/2 left-1/2 w-1 h-4 origin-bottom rounded-t-full"
          style={{
            backgroundColor: color,
            transform: `rotate(${i * 60}deg) translateX(-50%)`,
            animation: 'splash 1.5s ease-out forwards',
          }}
        />
      ))}
      <style>
        {`@keyframes splash {
          0% { height: 0; opacity: 0; }
          50% { height: 100%; opacity: 0.8; }
          100% { height: 0; opacity: 0; }
        }`}
      </style>
    </div>
  );
};

// New component for a car silhouette
interface CarSilhouetteProps extends React.HTMLAttributes<HTMLDivElement> {
  color?: string;
  width?: string;
}

export const CarSilhouette = ({
  color = 'rgba(59, 130, 246, 0.15)',
  width = '200px',
  className,
  ...props
}: CarSilhouetteProps) => {
  return (
    <div
      className={cn('relative', className)}
      {...props}
    >
      <div 
        style={{
          width,
          height: `calc(${width} * 0.6)`,
          backgroundColor: color,
          borderRadius: `${parseInt(width) * 0.15}px / ${parseInt(width) * 0.15}px`,
          position: 'relative',
        }}
      >
        <div 
          style={{
            position: 'absolute',
            width: `calc(${width} * 0.7)`,
            height: `calc(${width} * 0.25)`,
            backgroundColor: color,
            borderRadius: `${parseInt(width) * 0.1}px ${parseInt(width) * 0.1}px 0 0`,
            top: `calc(${width} * -0.15)`,
            left: `calc(${width} * 0.15)`,
          }}
        />
        <div 
          style={{
            position: 'absolute',
            width: `calc(${width} * 0.2)`,
            height: `calc(${width} * 0.2)`,
            backgroundColor: 'rgba(0,0,0,0.05)',
            borderRadius: '50%',
            bottom: `calc(${width} * 0.05)`,
            left: `calc(${width} * 0.15)`,
          }}
        />
        <div 
          style={{
            position: 'absolute',
            width: `calc(${width} * 0.2)`,
            height: `calc(${width} * 0.2)`,
            backgroundColor: 'rgba(0,0,0,0.05)',
            borderRadius: '50%',
            bottom: `calc(${width} * 0.05)`,
            right: `calc(${width} * 0.15)`,
          }}
        />
      </div>
    </div>
  );
};

export default {
  FoamBubbles,
  FloatingElement,
  ProgressiveBlur,
  GlassPanel,
  GlassText,
  WaterDrop,
  Splash,
  CarSilhouette
};
