import React from 'react';
interface HeroDecorationsProps {
  color?: string;
}
export function HeroDecorations({ color = '#2F6BF6' }: HeroDecorationsProps) {
  const gradientStyleLeft = {
    backgroundImage: `radial-gradient(circle at top left, ${color}20, transparent 50%)`,
  };
  const gradientStyleRight = {
    backgroundImage: `radial-gradient(circle at bottom right, ${color}20, transparent 50%)`,
  };
  return (
    <>
      {/* Left Arc */}
      <div
        className="absolute top-0 left-0 w-[120vw] h-[120vw] md:w-[80vw] md:h-[80vw] lg:w-[60vw] lg:h-[60vw] rounded-full pointer-events-none -z-10"
        style={{
          ...gradientStyleLeft,
          transform: 'translate(-50%, -50%)',
        }}
      />
      {/* Right Arc */}
      <div
        className="absolute bottom-0 right-0 w-[120vw] h-[120vw] md:w-[80vw] md:h-[80vw] lg:w-[60vw] lg:h-[60vw] rounded-full pointer-events-none -z-10"
        style={{
          ...gradientStyleRight,
          transform: 'translate(50%, 50%)',
        }}
      />
    </>
  );
}