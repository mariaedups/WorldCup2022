import React, { useState, useEffect } from 'react';
import { useSimulation } from '../SimulationContext';

const formatTeamName = (name: string) => {
  return name.length > 3 ? name.substring(0, 3).toUpperCase() : name.toUpperCase();
};

export const Chapter4: React.FC = () => {
  const { activeRun } = useSimulation();
  const [simulationStep, setSimulationStep] = useState<number>(0);

  // Safely extract knockouts from active run
  const getMatches = (roundKey: 'r32' | 'r16' | 'qf' | 'sf' | 'final', count: number) => {
    const matches = activeRun.knockouts[roundKey] || [];
    // Pad with empty matches if missing
    return Array.from({ length: count }).map((_, i) => {
      if (matches[i]) return matches[i];
      return { team1: 'TBD', team2: 'TBD', score1: 0, score2: 0 };
    });
  };

  const r32Matches = getMatches('r32', 16);
  const r16Matches = getMatches('r16', 8);
  const qfMatches = getMatches('qf', 4);
  const sfMatches = getMatches('sf', 2);
  const finalMatches = getMatches('final', 1);

  // Reset simulation steps when the active run changes
  useEffect(() => {
    setSimulationStep(0);
  }, [activeRun]);

  const handleSimulate = () => {
    if (simulationStep >= 5) {
      setSimulationStep(0); // Reset
    } else {
      setSimulationStep((prev) => prev + 1);
    }
  };



  return (
    <div className="flex-1 flex flex-col items-center px-4 py-12 bg-background-dark font-sans min-h-screen grid-pattern">
      <div className="text-center mb-16 max-w-2xl mt-16">
        <h1 className="font-display text-5xl md:text-6xl italic font-light text-white mb-2">Phase 3: The Tournament</h1>
        <p className="font-body text-slate-400 text-lg">The road to the trophy continues. 48 Teams. 1 Champion.</p>
      </div>

      <div className="w-full max-w-7xl flex flex-col items-center space-y-16 gap-y-24">

        {/* Round of 32 */}
        <section className="w-full bg-surface/10 rounded-3xl p-4 border border-white/5 relative z-10">
          <div className="flex justify-center mb-6">
            <div className="bg-primary/10 border border-primary/30 px-4 py-1.5 rounded-full flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
              <span className="font-mono text-[10px] text-primary uppercase tracking-[0.2em] font-bold">Round of 32 Active</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-[1px] flex-1 bg-border-muted"></div>
            <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-slate-500">Round of 32</h3>
            <div className="h-[1px] flex-1 bg-border-muted"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 px-2">
            {r32Matches.map((m, idx) => (
              <div key={idx} className="flex flex-col gap-4">
                <div className={`bg-surface border border-border-muted p-3 rounded-lg ${simulationStep >= 1 ? 'hover:border-primary/50 group opacity-100' : 'opacity-60'}`}>
                  <div className="flex justify-between font-mono text-[10px] mb-2 opacity-50 uppercase">
                    <span>Match {String(idx + 1).padStart(2, '0')}</span>
                    <span>{simulationStep >= 1 ? 'FT' : '---'}</span>
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`font-mono text-xs ${simulationStep >= 1 && m.score1 > m.score2 ? 'text-primary font-bold' : ''}`}>{formatTeamName(m.team1)}</span>
                    <span className={`font-mono ${simulationStep >= 1 ? (m.score1 > m.score2 ? 'text-primary' : 'opacity-50') : 'opacity-50'}`}>{simulationStep >= 1 ? m.score1 : '-'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`font-mono text-xs ${simulationStep >= 1 && m.score2 > m.score1 ? 'text-primary font-bold' : 'opacity-50'}`}>{formatTeamName(m.team2)}</span>
                    <span className={`font-mono ${simulationStep >= 1 ? (m.score2 > m.score1 ? 'text-primary' : 'opacity-50') : 'opacity-50'}`}>{simulationStep >= 1 ? m.score2 : '-'}</span>
                  </div>
                </div>
              </div>
            ))}
            </div>
          </section>


        {/* Downward Flow to Round of 16 */}
        <div className="w-full flex flex-col items-center gap-16 relative">
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex justify-around w-full max-w-5xl h-16 pointer-events-none opacity-20">
            <div className="w-[1px] bg-primary"></div>
            <div className="w-[1px] bg-border-muted"></div>
            <div className="w-[1px] bg-border-muted"></div>
            <div className="w-[1px] bg-border-muted"></div>
          </div>

          {/* Round of 16 */}
          <section className={`w-full bg-surface/10 rounded-3xl p-4 border border-white/5 relative z-10 transition-opacity duration-1000 ${simulationStep >= 1 ? 'opacity-100' : 'opacity-30'}`}>
             <div className="flex justify-center mb-6">
                {simulationStep >= 1 && (
                  <div className="bg-primary/10 border border-primary/30 px-4 py-1.5 rounded-full flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
                    <span className="font-mono text-[10px] text-primary uppercase tracking-[0.2em] font-bold">Round of 16 Active</span>
                  </div>
                )}
             </div>

             <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-[1px] w-32 bg-border-muted"></div>
              <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-slate-500">Round of 16</h3>
              <div className="h-[1px] w-32 bg-border-muted"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-12">
              {r16Matches.map((m, i) => (
                <div key={i} className={`bg-surface ${simulationStep >= 2 && m.score1 > m.score2 ? 'border-l-2 border-primary glow-primary' : 'border border-border-muted'} p-4 rounded-lg`}>
                  <div className="flex justify-between font-mono text-[10px] mb-2 opacity-50 uppercase"><span>R16 - Match {i+1}</span></div>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`font-mono text-sm ${simulationStep >= 2 && m.score1 > m.score2 ? 'font-bold text-primary' : ''}`}>{simulationStep >= 1 ? formatTeamName(m.team1) : 'TBD'}</span>
                    <span className={`font-mono ${simulationStep >= 2 ? (m.score1 > m.score2 ? 'text-primary' : 'opacity-50') : 'opacity-50'}`}>{simulationStep >= 2 ? m.score1 : '-'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`font-mono text-sm ${simulationStep >= 2 && m.score2 > m.score1 ? 'font-bold text-primary' : ''}`}>{simulationStep >= 1 ? formatTeamName(m.team2) : 'TBD'}</span>
                    <span className={`font-mono ${simulationStep >= 2 ? (m.score2 > m.score1 ? 'text-primary' : 'opacity-50') : 'opacity-50'}`}>{simulationStep >= 2 ? m.score2 : '-'}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>


          {/* Quarter Finals */}
          <section className={`w-full relative z-10 transition-opacity duration-1000 ${simulationStep >= 2 ? 'opacity-100' : 'opacity-30'}`}>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-[1px] w-48 bg-border-muted"></div>
              <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-slate-500">Quarter Finals</h3>
              <div className="h-[1px] w-48 bg-border-muted"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-12">
              {qfMatches.map((m, idx) => (
                <div key={idx} className="bg-surface/50 border border-border-muted p-5 rounded-xl border-dashed">
                  <div className="flex justify-between font-mono text-[10px] mb-4 opacity-50 uppercase"><span>QF - Match {idx+1}</span></div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-mono text-base ${simulationStep >= 2 ? 'not-italic opacity-100' : 'italic opacity-40'} ${simulationStep >= 3 && m.score1 > m.score2 ? 'text-primary font-bold' : ''}`}>{simulationStep >= 2 ? formatTeamName(m.team1) : 'TBD'}</span>
                    <span className={`font-mono ${simulationStep >= 3 ? (m.score1 > m.score2 ? 'text-primary' : 'opacity-50') : 'opacity-50'}`}>{simulationStep >= 3 ? m.score1 : '-'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`font-mono text-base ${simulationStep >= 2 ? 'not-italic opacity-100' : 'italic opacity-40'} ${simulationStep >= 3 && m.score2 > m.score1 ? 'text-primary font-bold' : ''}`}>{simulationStep >= 2 ? formatTeamName(m.team2) : 'TBD'}</span>
                    <span className={`font-mono ${simulationStep >= 3 ? (m.score2 > m.score1 ? 'text-primary' : 'opacity-50') : 'opacity-50'}`}>{simulationStep >= 3 ? m.score2 : '-'}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Semi Finals */}
          <section className={`w-full flex flex-col items-center relative z-10 transition-opacity duration-1000 ${simulationStep >= 3 ? 'opacity-100' : 'opacity-30'}`}>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-[1px] w-64 bg-border-muted"></div>
              <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-slate-500">Semi Finals</h3>
              <div className="h-[1px] w-64 bg-border-muted"></div>
            </div>

            <div className="flex flex-wrap justify-center gap-12 w-full px-12">
              {sfMatches.map((m, idx) => (
                <div key={idx} className="w-full max-w-sm bg-surface/30 border border-border-muted p-6 rounded-2xl flex flex-col gap-3">
                  <div className="font-mono text-[10px] opacity-50 uppercase text-center mb-2">Semi {idx+1}</div>
                  <div className="h-8 w-full bg-border-muted/30 rounded flex items-center justify-between px-4">
                    <span className={`font-mono text-xs ${simulationStep >= 3 ? 'opacity-100 font-bold' : 'opacity-40 italic font-normal'} ${simulationStep >= 4 && m.score1 > m.score2 ? 'text-primary' : ''}`}>{simulationStep >= 3 ? formatTeamName(m.team1) : 'WAITING FOR RESULTS'}</span>
                    {simulationStep >= 4 && <span className={`font-mono ${m.score1 > m.score2 ? 'text-primary' : 'opacity-50'}`}>{m.score1}</span>}
                  </div>
                  <div className="h-8 w-full bg-border-muted/30 rounded flex items-center justify-between px-4">
                    <span className={`font-mono text-xs ${simulationStep >= 3 ? 'opacity-100 font-bold' : 'opacity-40 italic font-normal'} ${simulationStep >= 4 && m.score2 > m.score1 ? 'text-primary' : ''}`}>{simulationStep >= 3 ? formatTeamName(m.team2) : 'WAITING FOR RESULTS'}</span>
                    {simulationStep >= 4 && <span className={`font-mono ${m.score2 > m.score1 ? 'text-primary' : 'opacity-50'}`}>{m.score2}</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>

                    {/* Final */}
          <section className={`w-full flex flex-col items-center pt-8 pb-12 relative z-10 transition-opacity duration-1000 ${simulationStep >= 4 ? 'opacity-100' : 'opacity-30'}`}>
            <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="flex items-center justify-center gap-4 mb-12">
              <div className="h-[1px] w-24 bg-primary/50"></div>
              <div className="text-primary font-mono text-sm tracking-[0.5em] font-black uppercase">The Final</div>
              <div className="h-[1px] w-24 bg-primary/50"></div>
            </div>

            <div className="w-full max-w-2xl bg-surface border-2 border-primary p-12 rounded-[2rem] glow-primary relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <span className="material-symbols-outlined text-primary/30 text-6xl">stadium</span>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
                <div className="flex flex-col items-center gap-4 group cursor-pointer">
                  <div className={`h-24 w-24 rounded-full bg-border-muted border-2 border-dashed border-slate-700 flex items-center justify-center transition-colors ${simulationStep >= 5 && finalMatches[0].score1 > finalMatches[0].score2 ? 'border-primary glow-primary' : 'group-hover:border-primary'}`}>
                    <span className={`material-symbols-outlined text-4xl transition-all ${simulationStep >= 4 ? 'hidden' : 'opacity-20 group-hover:opacity-100 group-hover:text-primary'}`}>question_mark</span>
                    {simulationStep >= 4 && <span className={`font-display text-4xl font-bold ${simulationStep >= 5 && finalMatches[0].score1 > finalMatches[0].score2 ? 'text-primary' : 'text-white'}`}>{simulationStep >= 4 ? formatTeamName(finalMatches[0].team1) : ''}</span>}
                  </div>
                  <span className={`font-display text-2xl font-bold tracking-tight italic ${simulationStep >= 4 ? 'opacity-100' : 'opacity-40 group-hover:opacity-100'} ${simulationStep >= 5 && finalMatches[0].score1 > finalMatches[0].score2 ? 'text-primary' : ''}`}>{simulationStep >= 4 ? formatTeamName(finalMatches[0].team1) : 'Finalist A'}</span>
                </div>

                <div className="flex flex-col items-center min-w-[120px]">
                  {simulationStep >= 5 ? (
                    <div className="flex items-center gap-4">
                      <div className={`font-mono text-6xl font-black italic ${finalMatches[0].score1 > finalMatches[0].score2 ? 'text-primary' : 'text-white'}`}>{finalMatches[0].score1}</div>
                      <div className="font-mono text-3xl font-black text-slate-500">-</div>
                      <div className={`font-mono text-6xl font-black italic ${finalMatches[0].score2 > finalMatches[0].score1 ? 'text-primary' : 'text-white'}`}>{finalMatches[0].score2}</div>
                    </div>
                  ) : (
                    <div className="font-mono text-5xl font-black text-primary mb-2 italic">VS</div>
                  )}
                  <div className="font-mono text-xs tracking-widest opacity-50 uppercase mt-4">July 19, 2026</div>
                  <div className="font-mono text-xs tracking-widest opacity-50 uppercase">MetLife Stadium</div>
                </div>

                <div className="flex flex-col items-center gap-4 group cursor-pointer">
                  <div className={`h-24 w-24 rounded-full bg-border-muted border-2 border-dashed border-slate-700 flex items-center justify-center transition-colors ${simulationStep >= 5 && finalMatches[0].score2 > finalMatches[0].score1 ? 'border-primary glow-primary' : 'group-hover:border-primary'}`}>
                    <span className={`material-symbols-outlined text-4xl transition-all ${simulationStep >= 4 ? 'hidden' : 'opacity-20 group-hover:opacity-100 group-hover:text-primary'}`}>question_mark</span>
                    {simulationStep >= 4 && <span className={`font-display text-4xl font-bold ${simulationStep >= 5 && finalMatches[0].score2 > finalMatches[0].score1 ? 'text-primary' : 'text-white'}`}>{simulationStep >= 4 ? formatTeamName(finalMatches[0].team2) : ''}</span>}
                  </div>
                  <span className={`font-display text-2xl font-bold tracking-tight italic ${simulationStep >= 4 ? 'opacity-100' : 'opacity-40 group-hover:opacity-100'} ${simulationStep >= 5 && finalMatches[0].score2 > finalMatches[0].score1 ? 'text-primary' : ''}`}>{simulationStep >= 4 ? formatTeamName(finalMatches[0].team2) : 'Finalist B'}</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Floating Bottom Action */}
      <div className="sticky bottom-10 left-1/2 -translate-x-1/2 z-50 w-fit mx-auto">
        <button
          onClick={handleSimulate}
          className="bg-primary text-black px-12 py-5 rounded-full font-mono font-black uppercase tracking-widest text-sm flex items-center gap-4 shadow-2xl hover:scale-105 active:scale-95 transition-all"
        >
          {simulationStep >= 5 ? 'Reset Tournament' : 'Simulate Next Round'}
          <span className="material-symbols-outlined font-black">{simulationStep >= 5 ? 'restart_alt' : 'play_arrow'}</span>
        </button>
      </div>

    </div>
  );
};
