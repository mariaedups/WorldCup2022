import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSimulation } from '../SimulationContext';

export const Chapter5: React.FC = () => {
  const { probabilities, activeRun } = useSimulation();
  const [isRevealed, setIsRevealed] = useState(false);
  const [animateBars, setAnimateBars] = useState(false);

  // Extract the winner from the probabilities to highlight the most likely overall winner
  const actualWinner = probabilities.length > 0 ? probabilities[0].team : '';

  // Get top 5 probabilities for chart
  const topProbabilities = probabilities.slice(0, 5).map(p => ({
    ...p,
    actual: p.team === actualWinner,
    color: p.team === actualWinner ? 'bg-primary/90' : 'bg-secondary/80'
  }));


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
            {actualWinner}
          </h1>

          <p className={`mt-12 font-display italic font-light text-2xl md:text-3xl text-text-muted max-w-2xl leading-snug ${isRevealed ? 'animate-rise delay-500' : ''}`}>
            "After 1000 simulated timelines, {actualWinner} stands above the rest as the most likely champion of the world."
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
              <span className="font-mono text-xs text-text-muted uppercase">Most Likely Winner</span>
            </div>
          </div>

          <div className="space-y-3 font-mono text-sm" id="chart-container">
            {topProbabilities.map((item, idx) => (
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
