import React, { useState } from 'react';

export const Chapter4: React.FC = () => {
  const [simulationStep, setSimulationStep] = useState(0);

  const handleSimulate = () => {
    if (simulationStep < 4) {
      setSimulationStep(prev => prev + 1);
    } else {
      setSimulationStep(0); // Reset for demo purposes
    }
  };

  return (
    <div className="flex-1 flex flex-col pt-[72px] h-screen relative bg-mesh-gradient overflow-hidden">
      {/* Chapter Header */}
      <header className="absolute top-[80px] left-6 md:left-10 z-30 pointer-events-none">
        <div className="flex items-baseline gap-4 mb-1">
          <h1 className="text-text-main text-4xl md:text-6xl font-display font-bold italic tracking-tight">Chapter 4: The Climb</h1>
          <span className="text-primary font-mono text-xs uppercase border border-primary/30 px-2 py-1 rounded bg-primary/10 backdrop-blur-md">
            {simulationStep === 0 ? 'Round of 32 Active' :
             simulationStep === 1 ? 'Round of 16 Active' :
             simulationStep === 2 ? 'Quarter-Finals Active' :
             'Semi-Finals Active'}
          </span>
        </div>
        <p className="text-text-muted text-lg font-body max-w-md leading-snug">
          Survival of the fittest. From 32 hopefuls down to the final 4 titans.
        </p>
      </header>

      {/* Bracket Scroll Container */}
      <div className="bracket-scroll flex-1 overflow-x-auto overflow-y-hidden flex items-center pl-6 md:pl-10 pr-40 relative snap-x snap-mandatory">

        {/* Grid Background Lines (Visual decoration) */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-10"
             style={{ backgroundImage: 'linear-gradient(#2A2E36 1px, transparent 1px), linear-gradient(90deg, #2A2E36 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        {/* ROUND 1: Round of 32 */}
        <div className="flex-shrink-0 w-[320px] flex flex-col justify-center h-full py-20 snap-start relative z-10 group/col">
          <h3 className="absolute top-4 left-0 text-text-muted font-mono text-xs uppercase tracking-[0.2em] border-b border-[#2A2E36] w-full pb-2">Round of 32</h3>

          <div className="flex flex-col justify-around h-full space-y-4">
            {/* Match 1 */}
            <div className="relative">
              <svg className="absolute top-1/2 left-full w-16 h-[60px] pointer-events-none z-0" style={{ transform: 'translateY(0%)' }}>
                <path className="fill-none stroke-2 stroke-[#2A2E36]" d="M0 30 C 32 30, 32 90, 64 90"></path>
              </svg>
              <div className={`bg-surface border ${simulationStep >= 1 ? 'border-[#2A2E36]' : 'border-primary/50 shadow-[0_0_15px_rgba(204,255,0,0.1)]'} rounded p-3 w-full hover:border-text-muted transition-colors cursor-pointer group/match`}>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[14px] text-text-muted">flag</span>
                    <span className="font-mono text-sm text-text-main font-bold">USA</span>
                  </div>
                  <span className="font-mono text-sm text-primary">{simulationStep >= 1 ? '2' : '-'}</span>
                </div>
                <div className={`flex justify-between items-center ${simulationStep >= 1 ? 'opacity-50' : ''}`}>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[14px] text-text-muted">flag</span>
                    <span className="font-mono text-sm text-text-main">WAL</span>
                  </div>
                  <span className="font-mono text-sm text-text-muted">{simulationStep >= 1 ? '1' : '-'}</span>
                </div>
              </div>
            </div>

            {/* Match 2 */}
            <div className="relative">
              <svg className="absolute top-1/2 left-full w-16 h-[60px] pointer-events-none z-0" style={{ transform: 'translateY(-100%)' }}>
                <path className="fill-none stroke-2 stroke-[#2A2E36]" d="M0 30 C 32 30, 32 -30, 64 -30"></path>
              </svg>
              <div className="bg-surface border border-[#2A2E36] rounded p-3 w-full hover:border-text-muted transition-colors cursor-pointer">
                <div className={`flex justify-between items-center mb-2 ${simulationStep >= 1 ? 'opacity-50' : ''}`}>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[14px] text-text-muted">flag</span>
                    <span className="font-mono text-sm text-text-main">IRN</span>
                  </div>
                  <span className="font-mono text-sm text-text-muted">{simulationStep >= 1 ? '0' : '-'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[14px] text-text-muted">flag</span>
                    <span className="font-mono text-sm text-text-main font-bold">ENG</span>
                  </div>
                  <span className="font-mono text-sm text-primary">{simulationStep >= 1 ? '3' : '-'}</span>
                </div>
              </div>
            </div>

            <div className="h-4"></div>

            {/* Match 3 */}
            <div className="relative">
              <svg className="absolute top-1/2 left-full w-16 h-[60px] pointer-events-none z-0">
                <path className="fill-none stroke-2 stroke-secondary drop-shadow-[0_0_3px_rgba(59,130,246,0.6)]" d="M0 30 C 32 30, 32 90, 64 90"></path>
              </svg>
              <div className="bg-surface border border-secondary/50 rounded p-3 w-full shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[14px] text-text-muted">flag</span>
                    <span className="font-mono text-sm text-text-main font-bold">ARG</span>
                  </div>
                  <span className="font-mono text-sm text-secondary font-bold">{simulationStep >= 1 ? '4' : '-'}</span>
                </div>
                <div className={`flex justify-between items-center ${simulationStep >= 1 ? 'opacity-40' : ''}`}>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[14px] text-text-muted">flag</span>
                    <span className="font-mono text-sm text-text-main">POL</span>
                  </div>
                  <span className="font-mono text-sm text-text-muted">{simulationStep >= 1 ? '1' : '-'}</span>
                </div>
              </div>
            </div>

            {/* Match 4 */}
            <div className="relative">
              <svg className="absolute top-1/2 left-full w-16 h-[60px] pointer-events-none z-0" style={{ transform: 'translateY(-100%)' }}>
                <path className="fill-none stroke-2 stroke-secondary drop-shadow-[0_0_3px_rgba(59,130,246,0.6)]" d="M0 30 C 32 30, 32 -30, 64 -30"></path>
              </svg>
              <div className="bg-surface border border-[#2A2E36] rounded p-3 w-full opacity-60">
                <div className={`flex justify-between items-center mb-2 ${simulationStep >= 1 ? 'opacity-50' : ''}`}>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[14px] text-text-muted">flag</span>
                    <span className="font-mono text-sm text-text-main">AUS</span>
                  </div>
                  <span className="font-mono text-sm text-text-muted">{simulationStep >= 1 ? '0' : '-'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[14px] text-text-muted">flag</span>
                    <span className="font-mono text-sm text-text-main font-bold">FRA</span>
                  </div>
                  <span className="font-mono text-sm text-primary">{simulationStep >= 1 ? '2' : '-'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-shrink-0 w-16 h-full"></div>

        {/* ROUND 2: Round of 16 */}
        <div className={`flex-shrink-0 w-[320px] flex flex-col justify-center h-full py-20 snap-start relative z-10 transition-opacity duration-500 ${simulationStep >= 1 ? 'opacity-100' : 'opacity-30'}`}>
          <h3 className="absolute top-4 left-0 text-text-muted font-mono text-xs uppercase tracking-[0.2em] border-b border-[#2A2E36] w-full pb-2">Round of 16</h3>
          <div className="flex flex-col justify-around h-full py-10 space-y-12">

            {/* Match R16-1 */}
            <div className="relative">
              <svg className="absolute top-1/2 left-full w-16 h-[120px] pointer-events-none z-0" style={{ transform: 'translateY(0%)' }}>
                <path className="fill-none stroke-2 stroke-[#2A2E36]" strokeDasharray="4 4" d="M0 60 C 32 60, 32 180, 64 180"></path>
              </svg>
              <div className="bg-surface border border-[#2A2E36] rounded p-3 w-full">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[14px] text-text-muted">flag</span>
                    <span className="font-mono text-sm text-text-main">{simulationStep >= 1 ? 'USA' : 'TBD'}</span>
                  </div>
                  <span className="font-mono text-sm text-text-muted">{simulationStep >= 2 ? '1' : '-'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[14px] text-text-muted">flag</span>
                    <span className="font-mono text-sm text-text-main">{simulationStep >= 1 ? 'ENG' : 'TBD'}</span>
                  </div>
                  <span className="font-mono text-sm text-primary">{simulationStep >= 2 ? '3' : '-'}</span>
                </div>
              </div>
            </div>

            {/* Match R16-2 */}
            <div className="relative">
              <svg className="absolute top-1/2 left-full w-16 h-[120px] pointer-events-none z-0" style={{ transform: 'translateY(-100%)' }}>
                <path className="fill-none stroke-2 stroke-[#2A2E36]" strokeDasharray="4 4" d="M0 60 C 32 60, 32 -60, 64 -60"></path>
              </svg>
              <div className="bg-surface border border-[#2A2E36] rounded p-3 w-full shadow-[0_0_20px_rgba(204,255,0,0.05)] border-l-2 border-l-primary">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[14px] text-text-muted">flag</span>
                    <span className="font-mono text-sm text-text-main font-bold">{simulationStep >= 1 ? 'ARG' : 'TBD'}</span>
                  </div>
                  <span className="font-mono text-sm text-primary">{simulationStep >= 2 ? '2' : '-'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[14px] text-text-muted">flag</span>
                    <span className="font-mono text-sm text-text-main">{simulationStep >= 1 ? 'FRA' : 'TBD'}</span>
                  </div>
                  <span className="font-mono text-sm text-text-muted">{simulationStep >= 2 ? '1' : '-'}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="flex-shrink-0 w-16 h-full"></div>

        {/* ROUND 3: Quarter-Finals */}
        <div className={`flex-shrink-0 w-[320px] flex flex-col justify-center h-full py-20 snap-start relative z-10 transition-opacity duration-500 ${simulationStep >= 2 ? 'opacity-100' : 'opacity-30'}`}>
          <h3 className="absolute top-4 left-0 text-text-muted font-mono text-xs uppercase tracking-[0.2em] border-b border-[#2A2E36] w-full pb-2">Quarter-Finals</h3>
          <div className="flex flex-col justify-center h-full">
            <div className="relative">
              <svg className="absolute top-1/2 left-full w-16 h-[120px] pointer-events-none z-0" style={{ transform: 'translateY(50%)' }}>
                <path className="fill-none stroke-2 stroke-[#2A2E36] opacity-30" d="M0 60 C 32 60, 32 60, 64 60"></path>
              </svg>
              {simulationStep >= 2 ? (
                <div className="bg-surface border border-[#2A2E36] rounded p-3 w-full">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[14px] text-text-muted">flag</span>
                      <span className="font-mono text-sm text-text-main">ENG</span>
                    </div>
                    <span className="font-mono text-sm text-text-muted">{simulationStep >= 3 ? '0' : '-'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[14px] text-text-muted">flag</span>
                      <span className="font-mono text-sm text-text-main">ARG</span>
                    </div>
                    <span className="font-mono text-sm text-primary">{simulationStep >= 3 ? '1' : '-'}</span>
                  </div>
                </div>
              ) : (
                <div className="bg-surface/50 border border-[#2A2E36] border-dashed rounded p-3 w-full text-center">
                  <span className="font-mono text-xs text-text-muted block py-4 uppercase tracking-widest">TBD vs TBD</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex-shrink-0 w-16 h-full"></div>

        {/* ROUND 4: Semi-Finals */}
        <div className={`flex-shrink-0 w-[320px] flex flex-col justify-center h-full py-20 snap-start relative z-10 transition-opacity duration-500 ${simulationStep >= 3 ? 'opacity-100' : 'opacity-30'}`}>
          <h3 className="absolute top-4 left-0 text-text-muted font-mono text-xs uppercase tracking-[0.2em] border-b border-[#2A2E36] w-full pb-2">Semi-Finals</h3>
          <div className="flex flex-col justify-center h-full">
            {simulationStep >= 3 ? (
              <div className="bg-surface border border-primary/50 shadow-[0_0_15px_rgba(204,255,0,0.1)] rounded p-3 w-full">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[14px] text-primary">emoji_events</span>
                    <span className="font-mono text-sm text-primary font-bold">ARG Advances to Final</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-surface/50 border border-[#2A2E36] border-dashed rounded p-3 w-full text-center">
                <span className="font-mono text-xs text-text-muted block py-4 uppercase tracking-widest">Waiting for simulation</span>
              </div>
            )}
          </div>
        </div>

        {/* Background Texture */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" style={{ background: 'radial-gradient(circle at 50% 50%, transparent 0%, #0F1115 120%)' }}></div>
      </div>

      {/* Floating Action Button (FAB) */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
        <button
          onClick={handleSimulate}
          className="group flex items-center gap-3 bg-primary hover:bg-white text-black px-6 py-4 rounded-sm shadow-[0_0_30px_rgba(204,255,0,0.3)] transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <span className={`material-symbols-outlined text-[24px] transition-transform duration-500 ${simulationStep === 4 ? 'rotate-180' : 'group-hover:rotate-180'}`}>
            {simulationStep === 4 ? 'restart_alt' : 'play_circle'}
          </span>
          <span className="font-mono font-bold tracking-tight text-sm uppercase">
            {simulationStep === 4 ? 'Reset Bracket' : 'Simulate - run predictions'}
          </span>
        </button>
      </div>

      {/* Scrolling Indicators overlay */}
      <div className="fixed top-1/2 right-4 -translate-y-1/2 hidden md:flex flex-col gap-2 z-30">
        {[0, 1, 2, 3].map(step => (
          <div key={step} className={`w-1 rounded-full transition-all duration-300 ${simulationStep === step ? 'h-8 bg-primary' : 'h-2 bg-[#2A2E36]'}`}></div>
        ))}
      </div>
    </div>
  );
};
