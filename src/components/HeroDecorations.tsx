import React from 'react';
export function HeroDecorations() {
  return (
    <>
      {/* Left Arc */}
      <div
        className="absolute top-0 -left-1/4 w-[120vw] h-[120vw] md:w-[80vw] md:h-[80vw] lg:w-[60vw] lg:h-[60vw] rounded-full bg-gradient-to-tr from-[#2F6BF6]/20 to-[#2F6BF6]/0 pointer-events-none -z-10"
        style={{
          transform: 'translate(-50%, -50%)',
        }}
      />
      {/* Right Arc */}
      <div
        className="absolute bottom-0 -right-1/4 w-[120vw] h-[120vw] md:w-[80vw] md:h-[80vw] lg:w-[60vw] lg:h-[60vw] rounded-full bg-gradient-to-bl from-[#2F6BF6]/20 to-[#2F6BF6]/0 pointer-events-none -z-10"
        style={{
          transform: 'translate(50%, 50%)',
        }}
      />
    </>
  );
}