import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const PROBABILITIES = [
  { team: 'France', prob: 18.4, actual: true, color: 'bg-primary/90' },
  { team: 'Brazil', prob: 14.2, actual: false, color: 'bg-secondary/80' },
  { team: 'England', prob: 12.1, actual: false, color: 'bg-secondary/80' },
  { team: 'Argentina', prob: 9.8, actual: false, color: 'bg-secondary/80' },
  { team: 'Spain', prob: 8.5, actual: false, color: 'bg-secondary/60' }
];

export const Chapter5: React.FC = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [animateBars, setAnimateBars] = useState(false);

  // Hook to detect when analysis section is in view to trigger bar animations
  const { ref: chartRef, inView: chartInView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  useEffect(() => {
    if (chartInView && isRevealed) {
      setAnimateBars(true);
    }
  }, [chartInView, isRevealed]);

  const handleReveal = () => {
    setIsRevealed(true);
    setTimeout(() => {
      // Scroll smoothly to winner reveal
      document.getElementById('winner-reveal-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleReset = () => {
    setIsRevealed(false);
    setAnimateBars(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-background-dark text-text-main font-body antialiased overflow-x-hidden">

      {/* Section 1: Top Interaction */}
      <section className="relative pt-32 pb-8 flex flex-col items-center text-center px-4 z-20 h-screen justify-center">
        <h2 className="font-display font-bold italic text-3xl md:text-5xl text-text-main mb-4 max-w-4xl mx-auto">
          What if we ran this simulation 1000 times?
        </h2>
        <p className="font-body text-text-muted text-lg mb-10 max-w-2xl">
          Win probabilities based on 1000 Monte Carlo simulations of the 2026 tournament.
        </p>

        {!isRevealed && (
          <button
            onClick={handleReveal}
            id="reveal-button-main"
            className="group relative inline-flex items-center justify-center px-12 py-6 font-mono font-black text-2xl text-background-dark bg-primary hover:bg-white transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[0_0_50px_rgba(204,255,0,0.3)]"
          >
            <span className="relative flex items-center gap-4 uppercase">
              <span className="material-symbols-outlined text-3xl">workspace_premium</span>
              REVEAL WINNER
            </span>
          </button>
        )}
      </section>

      {/* Section 2: The Reveal (Initially Hidden) */}
      <section
        id="winner-reveal-section"
        className={`relative min-h-[60vh] flex flex-col items-center justify-center border-b border-[#2A2E36] overflow-hidden transition-opacity duration-1000 ${isRevealed ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}
      >
        <div className="absolute inset-0 bg-floodlight pointer-events-none"></div>
        <div className="absolute inset-0 bg-confetti opacity-50 pointer-events-none"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center text-center px-6">
          <div className={`mb-6 flex items-center gap-3 ${isRevealed ? 'animate-rise delay-100' : ''}`}>
            <span className="h-[1px] w-12 bg-primary/50"></span>
            <span className="font-mono text-primary text-sm tracking-[0.2em] uppercase font-bold">The 2026 World Champions</span>
            <span className="h-[1px] w-12 bg-primary/50"></span>
          </div>

          <h1 className={`font-display font-bold text-6xl md:text-8xl lg:text-9xl text-primary tracking-tight leading-none text-glow uppercase ${isRevealed ? 'animate-rise delay-300' : ''}`}>
            France
          </h1>

          <div className={`mt-12 mb-8 relative group ${isRevealed ? 'animate-rise delay-300' : ''}`}>
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000"></div>
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-surface border border-[#2A2E36] flex items-center justify-center shadow-2xl overflow-hidden">
              <div aria-hidden="true" className="w-full h-full flex flex-col relative">
                <div className="h-full w-1/3 bg-[#0055A4] absolute left-0"></div>
                <div className="h-full w-1/3 bg-white absolute left-1/3"></div>
                <div className="h-full w-1/3 bg-[#EF4135] absolute right-0"></div>
              </div>
            </div>
          </div>

          <p className={`font-display italic font-light text-2xl md:text-3xl text-text-muted max-w-2xl leading-snug ${isRevealed ? 'animate-rise delay-500' : ''}`}>
            "A tactical masterclass secured their second consecutive title in a thriller against Brazil."
          </p>
        </div>
      </section>

      {/* Section 3: Data Breakdown (Initially Hidden) */}
      <section
        id="analysis-section"
        className={`bg-background-dark relative py-16 md:py-24 px-4 md:px-0 transition-opacity duration-1000 ${isRevealed ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}
      >
        <div className="max-w-4xl mx-auto w-full" ref={chartRef}>
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#2A2E36] pb-6">
            <h3 className="font-mono text-xs text-text-muted uppercase tracking-widest">Performance Analytics</h3>
            <div className="flex items-center gap-2 text-right">
              <span className="w-3 h-3 rounded-full bg-secondary"></span>
              <span className="font-mono text-xs text-text-muted uppercase">Projected Win %</span>
              <span className="w-3 h-3 rounded-full bg-primary ml-4"></span>
              <span className="font-mono text-xs text-text-muted uppercase">Actual Winner</span>
            </div>
          </div>

          <div className="space-y-3 font-mono text-sm" id="chart-container">
            {PROBABILITIES.map((item, idx) => (
              <div key={idx} className="group relative flex items-center gap-4 py-1">
                <div className={`w-24 md:w-32 text-right font-body text-lg ${item.actual ? 'text-primary font-bold' : 'text-text-muted'}`}>
                  {item.team}
                </div>
                <div className={`flex-1 ${item.actual ? 'h-12' : 'h-8'} bg-surface rounded-sm relative border border-[#2A2E36]`}>
                  <div
                    className={`absolute top-0 left-0 h-full ${item.color} flex items-center px-3 transition-all duration-1000 ease-out`}
                    style={{
                      width: animateBars ? `${item.prob}%` : '0%',
                      transitionDelay: `${idx * 200}ms`
                    }}
                  >
                    <span className={`${item.actual ? 'text-background-dark font-bold' : 'text-white text-xs'} transition-opacity duration-300 ${animateBars ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: `${(idx * 200) + 1000}ms` }}>
                      {item.prob}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 flex flex-col items-center pb-20">
            <button
              onClick={handleReset}
              className="group relative inline-flex items-center justify-center px-8 py-4 font-mono font-bold text-background-dark bg-primary hover:bg-white transition-all duration-200"
            >
              <span className="relative flex items-center gap-2"><span className="material-symbols-outlined">refresh</span> RESET & RESIMULATE</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
