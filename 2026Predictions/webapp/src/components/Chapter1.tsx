import React from 'react';

export const Chapter1: React.FC = () => {
  return (
    <div className="relative h-screen w-full flex flex-col justify-center overflow-hidden bg-background-dark">
      {/* Background Layer: Stadium Visuals */}
      <div className="absolute inset-0 z-0 select-none">
        {/* Using a high quality stadium abstract image. */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
          aria-label="Abstract view of stadium floodlights piercing through a foggy night atmosphere"
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA3UkCRDQhp_yQFipnuY8inyd1YEx9NddR1RYyQKyHib65oBTE4QA-imUvgp7VOM1QX-rD2Dw0HFQO0S0Pu5zOhfP7A97lhFMbS-vCkcT0gtO4yXkR8Vlm0_f9Vo_FklT-a_9h0AsxrK11t6BL2_UK5yP34SvLBjxF9NDCclTBYJ8olMbPSlOreWBgdS7OjMzTlBXbISwdUTdLY_7NoPPqdvRnDnmXRWaGhOViKDQpBzqdjVPVSzJRcjl44dnAqzHumqD_V3YQfh2A')" }}
        />
        {/* Atmospheric Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background-dark/80 to-background-dark" />
        <div className="absolute inset-0 bg-gradient-to-r from-background-dark/90 via-transparent to-background-dark/90" />
        {/* Noise Texture */}
        <div className="absolute inset-0 bg-noise opacity-30" />
      </div>

      {/* Content Grid */}
      <div className="relative z-10 w-full px-6 md:px-12 h-full flex flex-col justify-center">
        {/* Grid Container */}
        <div className="grid grid-cols-12 gap-4 w-full max-w-[1400px] mx-auto">
          {/* Main Text Block (Cols 2-9) */}
          <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-2 flex flex-col gap-6">
            {/* Pre-title decoration */}
            <div className="flex items-center gap-3 mb-2 opacity-0 animate-[fadeIn_1s_ease-out_0.5s_forwards]">
              <div className="h-[1px] w-12 bg-primary"></div>
              <span className="font-mono text-primary text-xs tracking-[0.2em] uppercase font-bold">The Experiment Begins</span>
            </div>

            {/* H1 Title */}
            <h1 className="font-display font-bold text-white leading-[0.85] tracking-tight text-shadow-glow">
              <span className="block text-[4rem] md:text-[6rem] lg:text-[8rem] opacity-0 animate-[slideUp_1s_cubic-bezier(0.2,1,0.3,1)_0.2s_forwards]">
                2026:
              </span>
              <span className="block text-[4rem] md:text-[6rem] lg:text-[8rem] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 opacity-0 animate-[slideUp_1s_cubic-bezier(0.2,1,0.3,1)_0.4s_forwards]">
                THE EXPANSION
              </span>
            </h1>

            {/* Subtitle */}
            <h2 className="font-body italic font-light text-text-muted text-xl md:text-2xl lg:text-3xl max-w-2xl mt-4 opacity-0 animate-[fadeIn_1.5s_ease-out_0.8s_forwards]">
              A statistical journey through the chaos, probability, and glory of the first 48-team World Cup.
            </h2>
          </div>
        </div>
      </div>

      {/* Scroll Indicator (Absolute Positioned Bottom) */}
      <div className="absolute bottom-0 left-0 w-full pb-12 z-20 flex justify-center md:justify-start md:px-12">
        <div className="grid grid-cols-12 w-full max-w-[1400px] mx-auto">
          <div className="col-span-12 md:col-start-2 flex flex-col items-center md:items-start gap-4 opacity-0 animate-[fadeIn_1s_ease-out_1.2s_forwards]">
            <span className="font-mono text-[10px] tracking-widest text-primary uppercase">Begin Simulation</span>
            {/* Animated Vertical Line */}
            <div className="h-16 w-[1px] bg-white/10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-primary animate-scroll-line" />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/2 right-12 -translate-y-1/2 hidden lg:flex flex-col gap-32 z-0 opacity-20">
        <div className="rotate-90 origin-right">
          <span className="font-mono text-xs tracking-widest text-white">EST. PROBABILITY 99.9%</span>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(40px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};
