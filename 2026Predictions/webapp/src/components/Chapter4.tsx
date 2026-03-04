import React, { useState } from 'react';

export const Chapter4: React.FC = () => {
  const [simulationStep, setSimulationStep] = useState<number>(0);
  const [r32Scores, setR32Scores] = useState<number[][]>(Array(16).fill([0,0]));
  const [r16Scores, setR16Scores] = useState<number[][]>(Array(8).fill([0,0]));
  const [qfScores, setQfScores] = useState<number[][]>(Array(4).fill([0,0]));
  const [sfScores, setSfScores] = useState<number[][]>(Array(2).fill([0,0]));
  const [finalScore, setFinalScore] = useState<number[]>([0,0]);

  const generateScores = (count: number) => {
    return Array(count).fill(0).map(() => {
        let s1 = Math.floor(Math.random() * 4);
        let s2 = Math.floor(Math.random() * 4);
        if (s1 === s2) { // no ties allowed, force a winner
            if (Math.random() > 0.5) s1 += 1;
            else s2 += 1;
        }
        return [s1, s2];
    });
  };

  const handleSimulate = () => {
    if (simulationStep === 0) {
      setR32Scores(generateScores(16));
    } else if (simulationStep === 1) {
      setR16Scores(generateScores(8));
    } else if (simulationStep === 2) {
      setQfScores(generateScores(4));
    } else if (simulationStep === 3) {
      setSfScores(generateScores(2));
    } else if (simulationStep === 4) {
      setFinalScore(generateScores(1)[0]);
    } else if (simulationStep === 5) {
      // After final, next click resets
      setSimulationStep(0);
      return;
    }
    setSimulationStep((prev) => prev + 1);
  };

  const R32_MATCHES = [
    { m1: "USA", s1: "3", m2: "MAR", s2: "1", live: true },
    { m1: "TBD", s1: "-", m2: "TBD", s2: "-", date: "Jul 02" },
    { m1: "FRA", s1: "-", m2: "KOR", s2: "-", date: "Jul 02" },
    { m1: "ESP", s1: "-", m2: "CIV", s2: "-", date: "Jul 02" },
    { m1: "BRA", s1: "-", m2: "SCO", s2: "-" },
    { m1: "URU", s1: "-", m2: "JPN", s2: "-" },
    { m1: "ENG", s1: "-", m2: "MEX", s2: "-" },
    { m1: "ARG", s1: "-", m2: "AUS", s2: "-" },
    { m1: "GER", s1: "-", m2: "SEN", s2: "-" },
    { m1: "NED", s1: "-", m2: "EGY", s2: "-" },
    { m1: "POR", s1: "-", m2: "CAN", s2: "-" },
    { m1: "ITA", s1: "-", m2: "GHA", s2: "-" },
    { m1: "BEL", s1: "-", m2: "SUI", s2: "-" },
    { m1: "CRO", s1: "-", m2: "COL", s2: "-" },
    { m1: "DEN", s1: "-", m2: "TUN", s2: "-" },
    { m1: "MEX", s1: "-", m2: "KSA", s2: "-" }
  ];

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
            {R32_MATCHES.map((m, idx) => (
              <div key={idx} className="flex flex-col gap-4">
                <div className={`bg-surface border border-border-muted p-3 rounded-lg ${simulationStep >= 1 ? 'hover:border-primary/50 group opacity-100' : (m.date ? 'opacity-60' : '')}`}>
                  <div className="flex justify-between font-mono text-[10px] mb-2 opacity-50 uppercase">
                    <span>Match {String(idx + 1).padStart(2, '0')}</span>
                    <span>{simulationStep >= 1 ? 'FT' : (m.live ? <span className="animate-flicker-digit">Live</span> : m.date)}</span>
                  </div>
                  <div className="flex items-center justify-between mb-1">
                    <span className={`font-mono text-xs ${m.m1 === 'TBD' ? 'italic' : ''} ${simulationStep >= 1 && r32Scores[idx][0] > r32Scores[idx][1] ? 'text-primary font-bold' : ''}`}>{m.m1}</span>
                    <span className={`font-mono ${simulationStep >= 1 ? (r32Scores[idx][0] > r32Scores[idx][1] ? 'text-primary' : 'opacity-50') : 'opacity-50'}`}>{simulationStep >= 1 ? r32Scores[idx][0] : m.s1}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`font-mono text-xs ${m.m2 === 'TBD' ? 'italic' : ''} ${simulationStep >= 1 && r32Scores[idx][1] > r32Scores[idx][0] ? 'text-primary font-bold' : 'opacity-50'}`}>{m.m2}</span>
                    <span className={`font-mono ${simulationStep >= 1 ? (r32Scores[idx][1] > r32Scores[idx][0] ? 'text-primary' : 'opacity-50') : 'opacity-50'}`}>{simulationStep >= 1 ? r32Scores[idx][1] : m.s2}</span>
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
              <div className={`bg-surface ${simulationStep >= 1 ? 'border-l-2 border-primary glow-primary' : 'border border-border-muted'} p-4 rounded-lg`}>
                <div className="flex justify-between font-mono text-[10px] mb-2 opacity-50 uppercase"><span>R16 - Match 1</span></div>
                <div className="flex items-center justify-between mb-1">
                  <span className={`font-mono text-sm ${simulationStep >= 2 && r16Scores[0][0] > r16Scores[0][1] ? 'text-primary font-bold' : ''}`}>USA</span>
                  <span className={`font-mono ${simulationStep >= 2 ? (r16Scores[0][0] > r16Scores[0][1] ? 'text-primary' : 'opacity-50') : 'opacity-50'}`}>{simulationStep >= 2 ? r16Scores[0][0] : '-'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={`font-mono text-sm ${simulationStep >= 2 && r16Scores[0][1] > r16Scores[0][0] ? 'text-primary font-bold' : 'italic opacity-30'}`}>{simulationStep >= 1 ? 'Winner Match 02' : 'TBD'}</span>
                  <span className={`font-mono ${simulationStep >= 2 ? (r16Scores[0][1] > r16Scores[0][0] ? 'text-primary' : 'opacity-50') : 'opacity-50'}`}>{simulationStep >= 2 ? r16Scores[0][1] : '-'}</span>
                </div>
              </div>

              {['BRA vs ENG', 'GER vs POR', 'ITA vs FRA'].map((match, i) => {
                const [t1, t2] = match.split(' vs ');
                return (
                  <div key={i} className="bg-surface border border-border-muted p-4 rounded-lg">
                    <div className="flex justify-between font-mono text-[10px] mb-2 opacity-50 uppercase"><span>R16 - Match {i+2}</span></div>
                    <div className="flex items-center justify-between mb-1">
                      <span className={`font-mono text-sm ${simulationStep >= 2 && r16Scores[i+1][0] > r16Scores[i+1][1] ? 'text-primary font-bold' : ''}`}>{simulationStep >= 1 ? t1 : 'TBD'}</span>
                      <span className={`font-mono ${simulationStep >= 2 ? (r16Scores[i+1][0] > r16Scores[i+1][1] ? 'text-primary' : 'opacity-50') : 'opacity-50'}`}>{simulationStep >= 2 ? r16Scores[i+1][0] : '-'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className={`font-mono text-sm ${simulationStep >= 2 && r16Scores[i+1][1] > r16Scores[i+1][0] ? 'text-primary font-bold' : ''}`}>{simulationStep >= 1 ? t2 : 'TBD'}</span>
                      <span className={`font-mono ${simulationStep >= 2 ? (r16Scores[i+1][1] > r16Scores[i+1][0] ? 'text-primary' : 'opacity-50') : 'opacity-50'}`}>{simulationStep >= 2 ? r16Scores[i+1][1] : '-'}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Quarter Finals */}
          <section className={`w-full relative z-10 transition-opacity duration-1000 ${simulationStep >= 2 ? 'opacity-100' : 'opacity-30'}`}>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-[1px] w-48 bg-border-muted"></div>
              <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-slate-500">Quarter Finals</h3>
              <div className="h-[1px] w-48 bg-border-muted"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 px-32">
              {[1, 2].map(i => (
                <div key={i} className="bg-surface/50 border border-border-muted p-5 rounded-xl border-dashed">
                  <div className="flex justify-between font-mono text-[10px] mb-4 opacity-50 uppercase"><span>QF - Match {i}</span></div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-mono text-base ${simulationStep >= 2 ? 'not-italic opacity-100' : 'italic opacity-40'} ${simulationStep >= 3 && qfScores[i-1][0] > qfScores[i-1][1] ? 'text-primary font-bold' : ''}`}>{simulationStep >= 2 ? (i===1 ? 'USA' : 'GER') : 'TBD'}</span>
                    <span className={`font-mono ${simulationStep >= 3 ? (qfScores[i-1][0] > qfScores[i-1][1] ? 'text-primary' : 'opacity-50') : 'opacity-50'}`}>{simulationStep >= 3 ? qfScores[i-1][0] : '-'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`font-mono text-base ${simulationStep >= 2 ? 'not-italic opacity-100' : 'italic opacity-40'} ${simulationStep >= 3 && qfScores[i-1][1] > qfScores[i-1][0] ? 'text-primary font-bold' : ''}`}>{simulationStep >= 2 ? (i===1 ? 'BRA' : 'FRA') : 'TBD'}</span>
                    <span className={`font-mono ${simulationStep >= 3 ? (qfScores[i-1][1] > qfScores[i-1][0] ? 'text-primary' : 'opacity-50') : 'opacity-50'}`}>{simulationStep >= 3 ? qfScores[i-1][1] : '-'}</span>
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
              {[1, 2].map(i => (
                <div key={i} className="w-full max-w-sm bg-surface/30 border border-border-muted p-6 rounded-2xl flex flex-col gap-3">
                  <div className="font-mono text-[10px] opacity-50 uppercase text-center mb-2">Semi {i}</div>
                  <div className="h-8 w-full bg-border-muted/30 rounded flex items-center justify-between px-4">
                    <span className={`font-mono text-xs ${simulationStep >= 3 ? 'opacity-100 font-bold' : 'opacity-40 italic font-normal'} ${simulationStep >= 4 && sfScores[i-1][0] > sfScores[i-1][1] ? 'text-primary' : ''}`}>{simulationStep >= 3 ? (i===1 ? 'BRA' : 'FRA') : 'WAITING FOR RESULTS'}</span>
                    {simulationStep >= 4 && <span className={`font-mono ${sfScores[i-1][0] > sfScores[i-1][1] ? 'text-primary' : 'opacity-50'}`}>{sfScores[i-1][0]}</span>}
                  </div>
                  <div className="h-8 w-full bg-border-muted/30 rounded flex items-center justify-between px-4">
                    <span className={`font-mono text-xs ${simulationStep >= 3 ? 'opacity-100 font-bold' : 'opacity-40 italic font-normal'} ${simulationStep >= 4 && sfScores[i-1][1] > sfScores[i-1][0] ? 'text-primary' : ''}`}>{simulationStep >= 3 ? (i===1 ? 'ARG' : 'ENG') : 'WAITING FOR RESULTS'}</span>
                    {simulationStep >= 4 && <span className={`font-mono ${sfScores[i-1][1] > sfScores[i-1][0] ? 'text-primary' : 'opacity-50'}`}>{sfScores[i-1][1]}</span>}
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
                  <div className={`h-24 w-24 rounded-full bg-border-muted border-2 border-dashed border-slate-700 flex items-center justify-center transition-colors ${simulationStep >= 5 && finalScore[0] > finalScore[1] ? 'border-primary glow-primary' : 'group-hover:border-primary'}`}>
                    <span className={`material-symbols-outlined text-4xl transition-all ${simulationStep >= 4 ? 'hidden' : 'opacity-20 group-hover:opacity-100 group-hover:text-primary'}`}>question_mark</span>
                    {simulationStep >= 4 && <span className={`font-display text-4xl font-bold ${simulationStep >= 5 && finalScore[0] > finalScore[1] ? 'text-primary' : 'text-white'}`}>{simulationStep >= 4 ? 'BRA' : ''}</span>}
                  </div>
                  <span className={`font-display text-2xl font-bold tracking-tight italic ${simulationStep >= 4 ? 'opacity-100' : 'opacity-40 group-hover:opacity-100'} ${simulationStep >= 5 && finalScore[0] > finalScore[1] ? 'text-primary' : ''}`}>{simulationStep >= 4 ? 'BRA' : 'Finalist A'}</span>
                </div>

                <div className="flex flex-col items-center min-w-[120px]">
                  {simulationStep >= 5 ? (
                    <div className="flex items-center gap-4">
                      <div className={`font-mono text-6xl font-black italic ${finalScore[0] > finalScore[1] ? 'text-primary' : 'text-white'}`}>{finalScore[0]}</div>
                      <div className="font-mono text-3xl font-black text-slate-500">-</div>
                      <div className={`font-mono text-6xl font-black italic ${finalScore[1] > finalScore[0] ? 'text-primary' : 'text-white'}`}>{finalScore[1]}</div>
                    </div>
                  ) : (
                    <div className="font-mono text-5xl font-black text-primary mb-2 italic">VS</div>
                  )}
                  <div className="font-mono text-xs tracking-widest opacity-50 uppercase mt-4">July 19, 2026</div>
                  <div className="font-mono text-xs tracking-widest opacity-50 uppercase">MetLife Stadium</div>
                </div>

                <div className="flex flex-col items-center gap-4 group cursor-pointer">
                  <div className={`h-24 w-24 rounded-full bg-border-muted border-2 border-dashed border-slate-700 flex items-center justify-center transition-colors ${simulationStep >= 5 && finalScore[1] > finalScore[0] ? 'border-primary glow-primary' : 'group-hover:border-primary'}`}>
                    <span className={`material-symbols-outlined text-4xl transition-all ${simulationStep >= 4 ? 'hidden' : 'opacity-20 group-hover:opacity-100 group-hover:text-primary'}`}>question_mark</span>
                    {simulationStep >= 4 && <span className={`font-display text-4xl font-bold ${simulationStep >= 5 && finalScore[1] > finalScore[0] ? 'text-primary' : 'text-white'}`}>{simulationStep >= 4 ? 'FRA' : ''}</span>}
                  </div>
                  <span className={`font-display text-2xl font-bold tracking-tight italic ${simulationStep >= 4 ? 'opacity-100' : 'opacity-40 group-hover:opacity-100'} ${simulationStep >= 5 && finalScore[1] > finalScore[0] ? 'text-primary' : ''}`}>{simulationStep >= 4 ? 'FRA' : 'Finalist B'}</span>
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
