import React from 'react';

// Example data matching Screen 4
const GROUPS = [
  { id: 'A', teams: [
    { name: 'USA', gd: '+4', pts: '7', active: true },
    { name: 'WAL', gd: '+1', pts: '5', active: false },
    { name: 'PER', gd: '-2', pts: '3', active: false, muted: true },
    { name: 'IRN', gd: '-3', pts: '1', active: false, muted: true, opacity: 'opacity-40' }
  ]},
  { id: 'B', teams: [
    { name: 'ENG', gd: '+6', pts: '9', active: true },
    { name: 'SEN', gd: '+2', pts: '6', active: false },
    { name: 'KOR', gd: '-4', pts: '1', active: false, muted: true, opacity: 'opacity-40' },
    { name: 'PAR', gd: '-4', pts: '1', active: false, muted: true, opacity: 'opacity-40' }
  ]},
  { id: 'C', teams: [
    { name: 'ARG', gd: '+5', pts: '7', active: true },
    { name: 'MEX', gd: '0', pts: '4', active: false },
    { name: 'POL', gd: '-1', pts: '4', active: false, muted: true },
    { name: 'KSA', gd: '-4', pts: '1', active: false, muted: true, opacity: 'opacity-40' }
  ]},
  { id: 'D', teams: [
    { name: 'FRA', gd: '+7', pts: '9', active: true },
    { name: 'DEN', gd: '+2', pts: '6', active: false },
    { name: 'TUN', gd: '-3', pts: '1', active: false, muted: true, opacity: 'opacity-40' },
    { name: 'AUS', gd: '-6', pts: '1', active: false, muted: true, opacity: 'opacity-40' }
  ]},
  { id: 'E', teams: [
    { name: 'ESP', gd: '+8', pts: '7', active: true },
    { name: 'GER', gd: '+4', pts: '7', active: false },
    { name: 'JPN', gd: '-1', pts: '3', active: false, muted: true },
    { name: 'CRC', gd: '-11', pts: '0', active: false, muted: true, opacity: 'opacity-40' }
  ]},
  { id: 'F', active: true, teams: [
    { name: 'MAR', gd: '+3', pts: '7', active: true },
    { name: 'CRO', gd: '+2', pts: '5', active: false },
    { name: 'BEL', gd: '+1', pts: '4', active: false, muted: true },
    { name: 'CAN', gd: '-6', pts: '0', active: false, muted: true, opacity: 'opacity-40' }
  ]},
  { id: 'G', teams: [
    { name: 'BRA', gd: '+3', pts: '6', active: true },
    { name: 'SUI', gd: '+1', pts: '6', active: false },
    { name: 'CMR', gd: '0', pts: '4', active: false, muted: true },
    { name: 'SRB', gd: '-3', pts: '1', active: false, muted: true, opacity: 'opacity-40' }
  ]},
  { id: 'H', teams: [
    { name: 'POR', gd: '+2', pts: '6', active: true },
    { name: 'KOR', gd: '0', pts: '4', active: false },
    { name: 'URU', gd: '0', pts: '4', active: false, muted: true },
    { name: 'GHA', gd: '-2', pts: '3', active: false, muted: true, opacity: 'opacity-40' }
  ]},
  { id: 'I', teams: [
    { name: 'NED', gd: '+4', pts: '7', active: true },
    { name: 'CHI', gd: '+1', pts: '5', active: false },
    { name: 'ALG', gd: '-1', pts: '3', active: false, muted: true },
    { name: 'NZL', gd: '-4', pts: '1', active: false, muted: true, opacity: 'opacity-40' }
  ]},
  { id: 'J', teams: [
    { name: 'ITA', gd: '+5', pts: '9', active: true },
    { name: 'COL', gd: '+1', pts: '4', active: false },
    { name: 'CIV', gd: '-2', pts: '3', active: false, muted: true },
    { name: 'HON', gd: '-4', pts: '1', active: false, muted: true, opacity: 'opacity-40' }
  ]},
  { id: 'K', teams: [
    { name: 'BEL', gd: '+3', pts: '6', active: true },
    { name: 'EGY', gd: '+1', pts: '5', active: false },
    { name: 'SWE', gd: '-1', pts: '4', active: false, muted: true },
    { name: 'PAN', gd: '-3', pts: '1', active: false, muted: true, opacity: 'opacity-40' }
  ]},
  { id: 'L', teams: [
    { name: 'NGA', gd: '+4', pts: '7', active: true },
    { name: 'TUR', gd: '+2', pts: '6', active: false },
    { name: 'ECU', gd: '-2', pts: '2', active: false, muted: true, opacity: 'opacity-40' },
    { name: 'QAT', gd: '-4', pts: '1', active: false, muted: true, opacity: 'opacity-40' }
  ]},
];

export const Chapter3: React.FC = () => {
  return (
    <div className="relative w-full bg-bg-main">
      {/* Sticky Background Layer: The Dashboard */}
      <div className="sticky top-0 h-screen w-full flex flex-col pt-20 pb-6 px-6 overflow-hidden z-0 bg-background-dark">
        {/* Dashboard Header */}
        <div className="flex justify-between items-end mb-6 max-w-[1440px] mx-auto w-full">
          <div>
            <h1 className="font-display text-5xl md:text-6xl italic font-light text-white mb-2">Phase 2: The Grind</h1>
            <p className="font-body text-text-muted text-lg">Simulating 72 matches across 12 groups.</p>
          </div>
          <div className="text-right font-mono text-xs text-text-muted">
            <p>LIVE STANDINGS</p>
            <p className="text-primary">UPDATES IN REAL-TIME</p>
          </div>
        </div>

        {/* The 12-Group Grid */}
        <div className="flex-1 w-full max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 content-start">
          {GROUPS.map((group) => (
            <div
              key={group.id}
              className={`bg-surface border p-3 rounded-sm flex flex-col gap-2 transition-colors
                ${group.active ? 'border-primary border-opacity-50 shadow-[0_0_15px_-5px_rgba(204,255,0,0.1)]' : 'border-[#2A2E36] hover:border-primary/20 group'}`}
            >
              <div className="flex justify-between items-center border-b border-[#2A2E36] pb-1 mb-1">
                <span className={`font-mono text-xs font-bold ${group.active ? 'text-primary' : 'text-text-muted'}`}>
                  GROUP {group.id}
                </span>
                {group.active && (
                  <span className="material-symbols-outlined text-primary text-xs animate-pulse">update</span>
                )}
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
                  {group.teams.map((team, idx) => (
                    <tr key={idx} className={`${team.muted ? 'text-text-muted' : 'text-white'} ${team.opacity || ''}`}>
                      <td className="flex items-center gap-2">
                        {team.active ? (
                          <div className="w-1 h-3 bg-primary"></div>
                        ) : (
                          <span className="w-1 h-3 inline-block"></span>
                        )}
                        {team.name}
                      </td>
                      <td className="text-right text-text-muted">{team.gd}</td>
                      <td className={`text-right ${team.active ? 'font-bold text-primary' : (team.muted ? '' : 'font-bold')}`}>
                        {team.pts}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>

        {/* Bottom fade to blend with scroll */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background-dark to-transparent pointer-events-none"></div>
      </div>

      {/* Scrolling Foreground Layer: The Match Ticker */}
      <div className="relative w-full z-10 -mt-[90vh] pb-[50vh]">
        <div className="max-w-2xl mx-auto flex flex-col gap-8 px-4">

          {/* Spacer for initial scroll */}
          <div className="h-[50vh] flex items-center justify-center">
            <div className="text-center animate-bounce text-text-muted font-mono text-sm">
              <span className="material-symbols-outlined block text-2xl mb-2">arrow_downward</span>
              SCROLL TO SIMULATE
            </div>
          </div>

          {/* Matchday 1 Block */}
          <div className="flex flex-col gap-4">
            <div className="sticky top-24 z-20 self-start">
              <span className="bg-primary text-background-dark px-3 py-1 font-mono text-xs font-bold uppercase rounded-sm shadow-lg">
                Matchday 1
              </span>
            </div>

            <div className="backdrop-blur-md bg-surface/80 border border-[#2A2E36] rounded-md p-4 flex items-center justify-between shadow-xl transition-transform hover:scale-[1.02]">
              <div className="flex items-center gap-4 w-1/3">
                <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center border border-[#2A2E36] text-xs font-bold">US</div>
                <span className="font-display font-bold text-xl text-white">USA</span>
              </div>
              <div className="font-mono text-2xl font-bold flex items-center gap-4 text-text-muted">
                <span className="text-white">2</span>
                <span className="text-xs text-text-muted opacity-50">FT</span>
                <span className="text-white">0</span>
              </div>
              <div className="flex items-center justify-end gap-4 w-1/3">
                <span className="font-display font-bold text-xl text-text-muted">PER</span>
                <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center border border-[#2A2E36] text-xs text-text-muted">PE</div>
              </div>
            </div>

            <div className="backdrop-blur-md bg-surface/80 border border-[#2A2E36] rounded-md p-4 flex items-center justify-between shadow-xl">
              <div className="flex items-center gap-4 w-1/3">
                <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center border border-[#2A2E36] text-xs font-bold">FR</div>
                <span className="font-display font-bold text-xl text-white">FRA</span>
              </div>
              <div className="font-mono text-2xl font-bold flex items-center gap-4 text-text-muted">
                <span className="text-primary">4</span>
                <span className="text-xs text-text-muted opacity-50">FT</span>
                <span className="text-white">1</span>
              </div>
              <div className="flex items-center justify-end gap-4 w-1/3">
                <span className="font-display font-bold text-xl text-text-muted">TUN</span>
                <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center border border-[#2A2E36] text-xs text-text-muted">TN</div>
              </div>
            </div>

            {/* Narrative Break */}
            <div className="py-12 px-6 text-center">
              <p className="font-display italic text-3xl md:text-4xl leading-tight text-white/90">
                "France opens with a statement victory, but chaos brews in Group F."
              </p>
            </div>

            <div className="backdrop-blur-md bg-surface/80 border border-[#2A2E36] rounded-md p-4 flex items-center justify-between shadow-xl">
              <div className="flex items-center gap-4 w-1/3">
                <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center border border-[#2A2E36] text-xs text-text-muted">CA</div>
                <span className="font-display font-bold text-xl text-text-muted">CAN</span>
              </div>
              <div className="font-mono text-2xl font-bold flex items-center gap-4 text-text-muted">
                <span className="text-white">0</span>
                <span className="text-xs text-text-muted opacity-50">FT</span>
                <span className="text-primary">1</span>
              </div>
              <div className="flex items-center justify-end gap-4 w-1/3">
                <span className="font-display font-bold text-xl text-white">MAR</span>
                <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center border border-[#2A2E36] text-xs font-bold">MA</div>
              </div>
            </div>
          </div>

          {/* Matchday 2 Block */}
          <div className="flex flex-col gap-4 mt-12">
            <div className="sticky top-24 z-20 self-start">
              <span className="bg-surface border border-primary text-primary px-3 py-1 font-mono text-xs font-bold uppercase rounded-sm shadow-lg backdrop-blur-md">
                Matchday 2
              </span>
            </div>

            <div className="backdrop-blur-md bg-surface/80 border border-[#2A2E36] rounded-md p-4 flex items-center justify-between shadow-xl border-l-4 border-l-primary">
              <div className="flex items-center gap-4 w-1/3">
                <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center border border-[#2A2E36] text-xs font-bold">AR</div>
                <span className="font-display font-bold text-xl text-white">ARG</span>
              </div>
              <div className="font-mono text-2xl font-bold flex items-center gap-4 text-text-muted">
                <span className="text-white">1</span>
                <span className="text-xs text-text-muted opacity-50">FT</span>
                <span className="text-white">1</span>
              </div>
              <div className="flex items-center justify-end gap-4 w-1/3">
                <span className="font-display font-bold text-xl text-white">MEX</span>
                <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center border border-[#2A2E36] text-xs font-bold">MX</div>
              </div>
            </div>

            <div className="flex justify-center -mt-2 mb-2">
              <span className="font-mono text-[10px] bg-black/50 px-2 py-0.5 rounded text-primary">KEY RESULT: GROUP C OPEN WIDE</span>
            </div>

            <div className="backdrop-blur-md bg-surface/80 border border-[#2A2E36] rounded-md p-4 flex items-center justify-between shadow-xl">
              <div className="flex items-center gap-4 w-1/3">
                <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center border border-[#2A2E36] text-xs font-bold">BR</div>
                <span className="font-display font-bold text-xl text-white">BRA</span>
              </div>
              <div className="font-mono text-2xl font-bold flex items-center gap-4 text-text-muted">
                <span className="text-primary">3</span>
                <span className="text-xs text-text-muted opacity-50">FT</span>
                <span className="text-white">0</span>
              </div>
              <div className="flex items-center justify-end gap-4 w-1/3">
                <span className="font-display font-bold text-xl text-text-muted">SRB</span>
                <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center border border-[#2A2E36] text-xs text-text-muted">RS</div>
              </div>
            </div>
          </div>

          {/* Narrative Break */}
          <div className="py-20 px-6 text-center">
            <p className="font-display italic text-3xl md:text-5xl leading-tight text-white mb-4">
              "The giants awaken."
            </p>
            <p className="font-body text-text-muted text-lg max-w-md mx-auto">
              Brazil and France secure qualification early, shifting focus to the battle for second place in Groups D and G.
            </p>
          </div>

          {/* Matchday 3 Block */}
          <div className="flex flex-col gap-4">
            <div className="sticky top-24 z-20 self-start">
              <span className="bg-primary text-background-dark px-3 py-1 font-mono text-xs font-bold uppercase rounded-sm shadow-lg">
                Matchday 3
              </span>
            </div>

            <div className="backdrop-blur-md bg-surface/80 border border-[#2A2E36] rounded-md p-4 flex items-center justify-between shadow-xl opacity-60">
              <div className="flex items-center gap-4 w-1/3">
                <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center border border-[#2A2E36] text-xs text-text-muted">QA</div>
                <span className="font-display font-bold text-xl text-text-muted">QAT</span>
              </div>
              <div className="font-mono text-2xl font-bold flex items-center gap-4 text-text-muted">
                <span className="text-white">0</span>
                <span className="text-xs text-text-muted opacity-50">FT</span>
                <span className="text-white">2</span>
              </div>
              <div className="flex items-center justify-end gap-4 w-1/3">
                <span className="font-display font-bold text-xl text-white">ECU</span>
                <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center border border-[#2A2E36] text-xs font-bold">EC</div>
              </div>
            </div>

            <div className="backdrop-blur-md bg-surface/80 border border-[#2A2E36] rounded-md p-4 flex items-center justify-between shadow-xl">
              <div className="flex items-center gap-4 w-1/3">
                <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center border border-[#2A2E36] text-xs font-bold">BE</div>
                <span className="font-display font-bold text-xl text-primary">BEL</span>
              </div>
              <div className="font-mono text-2xl font-bold flex items-center gap-4 text-text-muted">
                <span className="text-primary text-shadow-glow">1</span>
                <span className="text-xs text-text-muted opacity-50">90+4'</span>
                <span className="text-white">0</span>
              </div>
              <div className="flex items-center justify-end gap-4 w-1/3">
                <span className="font-display font-bold text-xl text-text-muted">CRO</span>
                <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center border border-[#2A2E36] text-xs text-text-muted">HR</div>
              </div>
            </div>

            <div className="flex justify-center -mt-2 mb-2">
              <span className="font-mono text-[10px] bg-primary text-background-dark font-bold px-2 py-0.5 rounded animate-pulse">
                LAST MINUTE QUALIFIER
              </span>
            </div>
          </div>

          {/* Final Spacer */}
          <div className="h-[20vh] flex items-center justify-center opacity-50">
            <div className="text-center text-text-muted font-mono text-sm">
              Keep scrolling for Knockouts
              <span className="material-symbols-outlined block text-2xl mt-2">arrow_downward</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
