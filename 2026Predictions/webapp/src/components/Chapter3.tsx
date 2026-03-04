import React, { useState, useEffect } from 'react';

const HIGHLIGHTS = [
  "USA starts strong in Group A with a +4 GD.",
  "France dominates Group D, securing 9 points early.",
  "Italy remains unbeaten in Group J with a +5 GD.",
  "Spain and England show clinical precision, both topping their groups with 7 and 9 points.",
  "Chaos in Group F as Morocco and Croatia battle for the top spot."
];

const INITIAL_GROUPS = [
  {
    name: "A",
    teams: [
      { name: "USA", gd: 0, pts: 0, active: true },
      { name: "WAL", gd: 0, pts: 0, active: true },
      { name: "PER", gd: 0, pts: 3, active: false, muted: true },
      { name: "IRN", gd: 0, pts: 1, active: false, muted: true, faded: true }
    ]
  },
  {
    name: "B",
    teams: [
      { name: "ENG", gd: 0, pts: 0, active: true },
      { name: "SEN", gd: 0, pts: 0, active: true },
      { name: "KOR", gd: 0, pts: 1, active: false, muted: true, faded: true },
      { name: "PAR", gd: 0, pts: 1, active: false, muted: true, faded: true }
    ]
  },
  {
    name: "C",
    teams: [
      { name: "ARG", gd: 0, pts: 0, active: true },
      { name: "MEX", gd: 0, pts: 0, active: true },
      { name: "POL", gd: 0, pts: 4, active: false, muted: true },
      { name: "KSA", gd: 0, pts: 1, active: false, muted: true, faded: true }
    ]
  },
  {
    name: "D",
    teams: [
      { name: "FRA", gd: 0, pts: 0, active: true },
      { name: "DEN", gd: 0, pts: 0, active: true },
      { name: "TUN", gd: 0, pts: 1, active: false, muted: true, faded: true },
      { name: "AUS", gd: 0, pts: 1, active: false, muted: true, faded: true }
    ]
  },
  {
    name: "E",
    teams: [
      { name: "ESP", gd: 0, pts: 0, active: true },
      { name: "GER", gd: 0, pts: 0, active: true },
      { name: "JPN", gd: 0, pts: 3, active: false, muted: true },
      { name: "CRC", gd: 0, pts: 0, active: false, muted: true, faded: true }
    ]
  },
  {
    name: "F",
    activeUpset: true,
    teams: [
      { name: "MAR", gd: 0, pts: 0, active: true },
      { name: "CRO", gd: 0, pts: 0, active: true },
      { name: "BEL", gd: 0, pts: 4, active: false, muted: true },
      { name: "CAN", gd: 0, pts: 0, active: false, muted: true, faded: true }
    ]
  },
  {
    name: "G",
    teams: [
      { name: "BRA", gd: 0, pts: 0, active: true },
      { name: "SUI", gd: 0, pts: 0, active: true },
      { name: "CMR", gd: 0, pts: 4, active: false, muted: true },
      { name: "SRB", gd: 0, pts: 1, active: false, muted: true, faded: true }
    ]
  },
  {
    name: "H",
    teams: [
      { name: "POR", gd: 0, pts: 0, active: true },
      { name: "KOR", gd: 0, pts: 0, active: true },
      { name: "URU", gd: 0, pts: 4, active: false, muted: true },
      { name: "GHA", gd: 0, pts: 3, active: false, muted: true, faded: true }
    ]
  },
  {
    name: "I",
    teams: [
      { name: "NED", gd: 0, pts: 0, active: true },
      { name: "CHI", gd: 0, pts: 0, active: true },
      { name: "ALG", gd: 0, pts: 3, active: false, muted: true },
      { name: "NZL", gd: 0, pts: 1, active: false, muted: true, faded: true }
    ]
  },
  {
    name: "J",
    teams: [
      { name: "ITA", gd: 0, pts: 0, active: true },
      { name: "COL", gd: 0, pts: 0, active: true },
      { name: "CIV", gd: 0, pts: 3, active: false, muted: true },
      { name: "HON", gd: 0, pts: 1, active: false, muted: true, faded: true }
    ]
  },
  {
    name: "K",
    teams: [
      { name: "BEL", gd: 0, pts: 0, active: true },
      { name: "EGY", gd: 0, pts: 0, active: true },
      { name: "SWE", gd: 0, pts: 4, active: false, muted: true },
      { name: "PAN", gd: 0, pts: 1, active: false, muted: true, faded: true }
    ]
  },
  {
    name: "L",
    teams: [
      { name: "NGA", gd: 0, pts: 0, active: true },
      { name: "TUR", gd: 0, pts: 0, active: true },
      { name: "ECU", gd: 0, pts: 2, active: false, muted: true, faded: true },
      { name: "QAT", gd: 0, pts: 1, active: false, muted: true, faded: true }
    ]
  }
];

export const Chapter3: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isShuffling, setIsShuffling] = useState(false);
  const [shufflingGroups, setShufflingGroups] = useState(INITIAL_GROUPS);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HIGHLIGHTS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const triggerShuffle = () => {
    setIsShuffling(true);

    // Simulate numbers changing randomly
    let duration = 1500;

    // We update state rapidly
    const interval = setInterval(() => {
      setShufflingGroups(prevGroups =>
        prevGroups.map(g => ({
          ...g,
          teams: g.teams.map(t => ({
            ...t,
            // Only shuffle stats for active ones or occasionally others
            gd: t.active ? Math.floor(Math.random() * 10) : t.gd,
            pts: t.active ? Math.floor(Math.random() * 10) : t.pts
          }))
        }))
      );
    }, 80);

    setTimeout(() => {
      clearInterval(interval);
      setIsShuffling(false);

      // Settle on semi-realistic final mocked stats
      setShufflingGroups(prevGroups =>
        prevGroups.map(g => ({
          ...g,
          teams: g.teams.map((t, idx) => ({
            ...t,
            gd: idx === 0 ? 5 : (idx === 1 ? 2 : (idx === 2 ? -1 : -6)),
            pts: idx === 0 ? 9 : (idx === 1 ? 6 : (idx === 2 ? 3 : 0))
          }))
        }))
      );
    }, duration);
  };

  return (
    <div className="relative w-full min-h-screen pt-24 pb-12 px-6 flex flex-col z-0 bg-bg-main">
      <div className="flex justify-between items-end mb-6 max-w-[1440px] mx-auto w-full">
        <div>
          <h1 className="font-display text-5xl md:text-6xl italic font-light text-white mb-2">
            Phase 2: The Group Phase
          </h1>
          <p className="font-body text-text-muted text-lg">Simulating 72 matches across 12 groups.</p>

          <div className="mt-8 max-w-2xl border-l-2 border-accent pl-6 py-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-3">
              Tournament Highlights
            </p>
            <div className="relative min-h-[140px] md:min-h-[120px]" id="highlights-carousel">
              {HIGHLIGHTS.map((highlight, idx) => (
                <div
                  key={idx}
                  className={`highlight-slide absolute inset-0 transition-opacity duration-700 ${idx === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                >
                  <h2 className="font-display italic text-3xl md:text-4xl text-white leading-tight">
                    "{highlight}"
                  </h2>
                </div>
              ))}
            </div>

            <div className="flex gap-2 mt-6">
              {HIGHLIGHTS.map((_, idx) => (
                <div
                  key={idx}
                  className={`carousel-dot h-1 transition-all duration-300 ${idx === currentSlide ? 'dot-active' : 'w-4 bg-white/20'}`}
                ></div>
              ))}
            </div>

            <div className="mt-8">
               <button
                  onClick={triggerShuffle}
                  className="bg-accent hover:bg-white text-bg-main px-4 py-2 font-mono text-xs font-bold uppercase transition-colors rounded-sm"
               >
                  Simulate Matches
               </button>
            </div>
          </div>
        </div>

        <div className="text-right font-mono text-xs text-text-muted">
          <p>LIVE STANDINGS</p>
          <p className="text-accent animate-flicker">UPDATES IN REAL-TIME</p>
        </div>
      </div>

      {/* The 12-Group Grid */}
      <div className="flex-1 w-full max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 content-start">
        {shufflingGroups.map((group, gIdx) => (
          <div
            key={gIdx}
            className={`bg-bg-surface border p-3 rounded-sm flex flex-col gap-2 transition-colors ${group.activeUpset ? 'border-accent border-opacity-50 shadow-[0_0_15px_-5px_rgba(204,255,0,0.1)]' : 'border-border-subtle group hover:border-accent/20'}`}
          >
            <div className="flex justify-between items-center border-b border-border-subtle pb-1 mb-1">
              <span className={`font-mono text-xs font-bold ${group.activeUpset ? 'text-accent' : 'text-text-muted'}`}>GROUP {group.name}</span>
              {group.activeUpset && <span className="material-symbols-outlined text-accent text-xs animate-pulse">update</span>}
            </div>

            <table className="w-full text-xs font-mono">
              <thead className="text-text-muted/50 text-left">
                <tr>
                  <th className="font-normal pb-1">TEAM</th>
                  <th className="font-normal pb-1 text-right">GD</th>
                  <th className="font-normal pb-1 text-right">PTS</th>
                </tr>
              </thead>
              <tbody className="space-y-1">
                {group.teams.map((team, tIdx) => (
                  <tr key={tIdx} className={team.muted ? (team.faded ? "text-text-muted opacity-40" : "text-text-muted") : "text-white"}>
                    <td className="flex items-center gap-2">
                      {tIdx === 0 ? <div className="w-1 h-3 bg-accent"></div> : <span className="w-1 h-3 inline-block"></span>}
                      {team.name}
                    </td>
                    <td className="text-right text-text-muted">
                      <span className={isShuffling && team.active ? "shuffling" : ""}>{team.gd}</span>
                    </td>
                    <td className={`text-right ${tIdx === 0 || tIdx === 1 ? 'font-bold' : ''} ${tIdx === 0 ? 'text-accent' : ''}`}>
                      <span className={isShuffling && team.active ? "shuffling" : ""}>{team.pts}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};
