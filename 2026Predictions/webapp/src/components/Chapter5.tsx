import React from 'react';

// Example final probabilities
const PROBABILITIES = [
  { team: 'France', prob: 18.4, active: true, color: 'bg-primary/90' },
  { team: 'Brazil', prob: 14.2, active: false, color: 'bg-secondary/80' },
  { team: 'England', prob: 12.1, active: false, color: 'bg-secondary/80' },
  { team: 'Argentina', prob: 9.8, active: false, color: 'bg-secondary/80' },
  { team: 'Spain', prob: 8.5, active: false, color: 'bg-secondary/60' },
  { team: 'Germany', prob: 7.2, active: false, color: 'bg-secondary/60' },
  { team: 'Portugal', prob: 5.1, active: false, color: 'bg-secondary/40' },
];

export const Chapter5: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full flex flex-col bg-background-dark">
      {/* Section 1: The Reveal (Cinematic Top Half) */}
      <section className="relative min-h-[60vh] flex flex-col items-center justify-center border-b border-[#2A2E36] overflow-hidden">
        {/* Atmospheric Backgrounds */}
        <div className="absolute inset-0 bg-floodlight pointer-events-none"></div>
        <div className="absolute inset-0 bg-confetti opacity-50 pointer-events-none"></div>
        {/* Spotlights/Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-6">
          <div className="animate-rise delay-100 mb-6 flex items-center gap-3">
            <span className="h-[1px] w-12 bg-primary/50"></span>
            <span className="font-mono text-primary text-sm tracking-[0.2em] uppercase font-bold">The 2026 World Champions</span>
            <span className="h-[1px] w-12 bg-primary/50"></span>
          </div>

          <h1 className="animate-rise delay-200 font-display font-bold text-6xl md:text-8xl lg:text-9xl text-primary tracking-tight leading-none text-glow uppercase">
            France
          </h1>

          {/* Winner Image / Emblem Placeholder */}
          <div className="animate-rise delay-300 mt-12 mb-8 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-surface border border-[#2A2E36] flex items-center justify-center shadow-2xl">
              {/* Using a generic flag representation */}
              <div aria-hidden="true" className="w-full h-full rounded-full overflow-hidden flex flex-col relative">
                <div className="h-full w-1/3 bg-[#0055A4] absolute left-0"></div>
                <div className="h-full w-1/3 bg-white absolute left-1/3"></div>
                <div className="h-full w-1/3 bg-[#EF4135] absolute right-0"></div>
              </div>
            </div>
            <span className="sr-only">Flag of France, the winning team</span>
          </div>

          <p className="animate-rise delay-500 font-display italic font-light text-2xl md:text-3xl text-text-muted max-w-2xl leading-snug">
            "A tactical masterclass secured their second consecutive title in a thriller against Brazil."
          </p>
        </div>

        {/* Scroll Hint */}
        <div className="absolute bottom-8 animate-rise delay-700 opacity-50 flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest">Analysis</span>
          <span className="material-symbols-outlined text-text-muted text-lg animate-bounce">arrow_downward</span>
        </div>
      </section>

      {/* Section 2: Data Breakdown (Analytical Bottom Half) */}
      <section className="flex-1 relative py-16 md:py-24 px-4 md:px-0">
        <div className="max-w-4xl mx-auto w-full">
          {/* Section Header */}
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#2A2E36] pb-6">
            <div>
              <h2 className="font-display font-bold italic text-3xl md:text-4xl text-text-main mb-2">Simulation Probabilities</h2>
              <p className="font-body text-text-muted text-lg">Pre-tournament odds vs. the reality of this run.</p>
            </div>
            <div className="flex items-center gap-2 text-right">
              <span className="w-3 h-3 rounded-full bg-secondary"></span>
              <span className="font-mono text-xs text-text-muted uppercase">Projected Win %</span>
              <span className="w-3 h-3 rounded-full bg-primary ml-4"></span>
              <span className="font-mono text-xs text-text-muted uppercase">Actual Winner</span>
            </div>
          </div>

          {/* Chart Container */}
          <div className="space-y-3 font-mono text-sm">
            {PROBABILITIES.map((item, idx) => (
              <div key={idx} className={`group relative flex items-center gap-4 py-1 animate-rise ${
                item.active ? 'delay-100' :
                idx < 3 ? 'delay-200 opacity-80 hover:opacity-100 transition-opacity' :
                'delay-300 opacity-60 hover:opacity-100 transition-opacity'
              }`}>
                <div className={`w-24 md:w-32 text-right font-body text-lg ${item.active ? 'text-primary font-bold' : 'text-text-muted'}`}>
                  {item.team}
                </div>
                <div className={`flex-1 ${item.active ? 'h-12' : 'h-8'} bg-surface rounded-sm relative overflow-visible border border-[#2A2E36] transition-colors ${item.active ? 'group-hover:border-primary/30' : 'group-hover:border-secondary/30'}`}>
                  {/* Bar */}
                  <div
                    className={`absolute top-0 left-0 h-full ${item.color} flex items-center px-3 animate-bar`}
                    style={{ width: `${item.prob}%` }}
                  >
                    <span className={item.active ? 'text-background-dark font-bold' : 'text-white text-xs'}>
                      {item.prob}%
                    </span>
                  </div>

                  {/* Marker: This Simulation (Only for active winner) */}
                  {item.active && (
                    <div className="absolute -right-3 top-1/2 -translate-y-1/2 translate-x-full pl-3 flex items-center">
                      <span className="material-symbols-outlined text-primary text-xl rotate-180">arrow_right_alt</span>
                      <span className="ml-2 text-primary text-xs uppercase tracking-wider font-bold whitespace-nowrap">Winner</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Footer Action */}
          <div className="mt-20 flex flex-col items-center animate-rise delay-500 pb-20">
            <button className="group relative inline-flex items-center justify-center px-8 py-4 font-mono font-bold text-background-dark transition-all duration-200 bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-background-dark hover:bg-white">
              <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
              <span className="relative flex items-center gap-2">
                <span className="material-symbols-outlined">refresh</span>
                RESET & RESIMULATE
              </span>
            </button>
            <p className="mt-4 text-text-muted text-sm font-body italic opacity-60">Generate a new timeline</p>
          </div>
        </div>
      </section>
    </div>
  );
};
