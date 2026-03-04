import React, { useState } from 'react';

// Example mocked groups, enough for visually shuffling
type Team = {
  name: string;
  flag: string | null;
  host?: boolean;
}

const INITIAL_GROUPS: { id: string, teams: Team[] }[] = [
  { id: 'A', teams: [{ name: 'MEX', flag: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwyLGcc6dy0HlImE3CgLMPyRHlOejRpqBBtSH06buma5ahLrJFcB2ktF7TS_zOwb1wl9zjeJ_vPBGFUOzcJQfhZowrfWJgiplEbvDWjmGCeRhG645hd3jIb-Lnx3oG7eXIkhB6aGTlsax-SlUaia7PtFzT6lcamr75JV70id2I4B2D9n1JjmbA7897KrNSHq7jwxxonsYUdqvoxucXnSMihcQM7gJ7P3LIbWuCwqliKRBl9xrvPd5EgRMsCZa6lshjQMWvK9jdm7U', host: true }, { name: '---', flag: null }, { name: '---', flag: null }, { name: '---', flag: null }] },
  { id: 'B', teams: [{ name: 'CAN', flag: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgghIHI7dhun2guZEsbejK4nTN8u1C2MtsRgAx8FtSVD0we7q7jJP_LOcIUJUqIRbO8o5rD02LXcKGJIRPu4JWifGAxiWJZJR_rGS7r3D49sUwsbdLh6uTdIX-MDpEfsKBEj0CuLwvvBvwdMxnqZIAshh3mGBNQXZIIFTTuQaTzm310Rz_s-kya49f8G1N1-ZvXSNhUljlcwFH46LQcRptXf2c8Thnx4eVOywD1myMpEP-4zkPIENLUaDpZCVwgjxVUiWlkpg_ubw', host: true }, { name: '---', flag: null }, { name: '---', flag: null }, { name: '---', flag: null }] },
  { id: 'C', teams: [{ name: 'USA', flag: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaWnTsXWQtTKmiK17ceO_vzCzZpYroXmts--FPd3mDqWIuoJfgiVGJs03Ijdh51Wh8NyP5H9AjCE_n70Ts9LgUBQx74QlNuwCWwHqLzxydlSaTd2MuqLE3UlNEefODjzwBXHC0S-uYAlBoZXvHnCVU6BkInC0pX3ekcZOiGjagUvZwxlGT0ivSblReIQKKPbNZ5sSstK4mGwnf1GDvE3T56Mp5_jT74INIsSQLHFuyA8I7yNiXfxqiLXRYUGPDYe8j_rGaK18xcGs', host: true }, { name: '---', flag: null }, { name: '---', flag: null }, { name: '---', flag: null }] },
  { id: 'D', teams: [{ name: 'BRA', flag: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARJDGAo5HTV9694Te4ftKe6al0YexfWp-wWZMCitFsMgNpv4tLOwQB9CkEQHzes38atsFtYpPwGwiheOcihuSuzbRt4NMvDpXfIvPTb_IPXTKUUSdkkCPwEojhYewrkEyTILDuDljA1DJ1V7CHEsowvKwNIsQfSgl42FR607aZ4Qw86jfa_f20ShJfS6dviRIc-F9Dg2ZgGJJ_rukH81rOO8Pr2ErS-2uVLn_oPSr7Q2htr88ERBDMY6jLZTrBy0JSD1FkR0uhu1o' }, { name: '---', flag: null }, { name: '---', flag: null }, { name: '---', flag: null }] },
  { id: 'E', teams: [{ name: 'BEL', flag: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhOAGHgN3Gj8qCAqvFM_mNz_1p9HhO4YJe2DtxZyXj_x7jxyWEncmGwxRvX2Uktl3wyIAyWmjt7UHRIaxHCIgXowpAZT5_mFiDrD5LuiV0f0vUV8wLdRAsaULnlgv_xWAuIQMM_CVJACXi_C_d-QFbIPv8aNd-TB_YQxw0Iak8FILUvdrVIrybMF9hC4V78UWEixplA_BjybCMbzzesUHr_owqtKoKd1Ov--mm6YV03fDg875PhaQkdtHeGT24NzAIhbBAr7FfhUg' }, { name: '---', flag: null }, { name: '---', flag: null }, { name: '---', flag: null }] },
  { id: 'F', teams: [{ name: 'FRA', flag: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1Mv702GJh3j6DpIBPwp3lkFp-KjxZDUkw5TQs8FkmxXeT_jl3U90R-hpxhFQhjM8qODQgYDCrOBGJcd21lkN7gMrfIqj3giefuCrj4UyqXKWLymj8O_iSyBeyoJwL6ztNjr-3bOaSv-EOjEXcGbzTHxeoPxyU-pCChCt8wsPBc4VdG8QrrP40FwRGvsDHesS8IBSx7v_zfJkZixOtT1gNYkCtJNJhZ5ZoaaUq9OECj0M0AH7FpJCp5O3vc-BPPObr_rFol0SpJRI' }, { name: '---', flag: null }, { name: '---', flag: null }, { name: '---', flag: null }] },
  { id: 'G', teams: [{ name: 'ARG', flag: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHLpdoswWNO5kxVamzqBPdbboXp9qBMzJyHBrf0Pz2w8LZ55xj6O9sVlSH-2J0g5bw86JRR6CxKXr2CbwCXpCONqIqvD8b3aHSPf9z4mhXLKQ357PlKtsxW24jl6nxjavKh154VRgwLSCDRYtPXtXcuSH5PAliFHlDRZChVsaZembAmOo7xLt-6L2rfkyyEaCb14GQc1xg7aNRWxbzUZ8Fejl3S5c6leTapGPVKeuLFHVnDyMgQ3S6O2YV9RWoPD3BFF-AuGXRxzM' }, { name: '---', flag: null }, { name: '---', flag: null }, { name: '---', flag: null }] },
  { id: 'H', teams: [{ name: 'ESP', flag: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdBGtb0MjI9ElHQoas8fp6YFw5rQ3ZSc45jd38VGsuYqx8sEdUrGtgn_2lzzOwL-jl3Yj6xmrIvKaWWiWbWScvhQHzNRbufDjDP65DmtlkPqO2RGQo2gNYaulR0gk4OAjfaBGui7EULL0jszkOGeDjS_87OjCjFzehXp5gUGSeMypzFoLWW4IfwFDEKBGQ-EMgYvbg4g4mtvVvsPljBwDSfrIIgzSQkO4I8Fl4GC1TUKm9qPDrb5wlqcetJ_laTEcP_GBH0esSCjs' }, { name: '---', flag: null }, { name: '---', flag: null }, { name: '---', flag: null }] },
  { id: 'I', teams: [{ name: 'POR', flag: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATAgpDcJNOGPu8WtuQ3SS7ZtSz_lbjboB7Qt1alD1UDSi_B4PboHwOJnX-uCTu5QGxMLYN4SL1IxNP4_a2WT0BrM0eEm9d5DfRk0z7StInMlTKInJ1tW7MtB8oOHDeF67DV4Si-flaxz9FchZMGatmcYD5Npo_QsO109MrtTdgKF9WFoeBloNovb0UYlNi9xhprwU5-EoOHLvkBwf1jAc6BukjTgo62vGKbeliov9q__OPh6C2TAoWiZ2ncNNF6QFZ4xdC0nfbAyw' }, { name: '---', flag: null }, { name: '---', flag: null }, { name: '---', flag: null }] },
  { id: 'J', teams: [{ name: 'NED', flag: null }, { name: '---', flag: null }, { name: '---', flag: null }, { name: '---', flag: null }] },
  { id: 'K', teams: [{ name: 'GER', flag: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBaJe2noO1nbojIp15mCiovLcDnaGd0F-Y7-k_uocblAViNyOX7FYC8dJz2s_bZJPaG9ImP4Iu4us__6ecexyNtiRzWnuB-VysmrXCryIv8a6O2UYa1nIb5MHtyiHGa8x5e8KISOa3eWScbxPdn9CBGHSvY3OM2Phy0WXU4yN6SKRt0A7JLujZtwD7uaJX_AbhT_ADh0N-1LOxmZXll1hrNm3F1RstersOcXv3rAZqwmuh7Y4rS6Zi1pj9vSUHrSZWp_Pbb1h70iVM' }, { name: '---', flag: null }, { name: '---', flag: null }, { name: '---', flag: null }] },
  { id: 'L', teams: [{ name: 'ENG', flag: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoEpseatdve20p0p7syJ4e-qTOrNaU7Is5Etlsov-jCke_75aIDc-pfDE5_zkrqsMEEsBiJdyUv7u0jwOmzjRa6Vb0PS_lGz-MrCUnolw16K-lftT5i0Za-hF0vBpAKxXbsYE4DWCLM8Nc5nHajZ56U_pEuejsavNEkM4ByeqBJMOm3RYygYWTfB8Lplru91lRz_TU0PiSYRTqSZmT_-JwBF38B4DjDAh9uHMy3DeMyFninYe-urioujcFgWor1lFzYTqrgMBtG0k' }, { name: '---', flag: null }, { name: '---', flag: null }, { name: '---', flag: null }] },
];

// Mocked names to show when shuffle stops
const MOCK_TEAMS = ['SUI', 'SWE', 'CMR', 'POL', 'DEN', 'URU', 'CRO', 'SEN', 'JPN', 'MAR', 'SRB', 'KOR', 'GHA', 'PER', 'IRN', 'WAL', 'AUS', 'CRC', 'TUN', 'KSA', 'QAT', 'ECU', 'CHI', 'COL', 'CIV', 'EGY', 'PAN', 'NGA', 'TUR', 'NZL', 'ALG', 'HON', 'PAR'];

export const Chapter2: React.FC = () => {
  const [isShuffling, setIsShuffling] = useState(false);
  const [groups, setGroups] = useState(INITIAL_GROUPS);

  const handleShuffle = () => {
    setIsShuffling(true);

    // Simulate a slot machine effect with a timeout
    setTimeout(() => {
      // Mock randomly assigning teams
      const shuffled = INITIAL_GROUPS.map(group => {
        return {
          ...group,
          teams: group.teams.map((t, i) => {
            if (i === 0) return t; // keep first team
            // Pick a random team from mock list
            const randTeam = MOCK_TEAMS[Math.floor(Math.random() * MOCK_TEAMS.length)];
            return { name: randTeam, flag: null };
          })
        };
      });
      setGroups(shuffled);
      setIsShuffling(false);
    }, 2000);
  };

  return (
    <div className="flex-grow pt-24 pb-20 px-6 lg:px-10 bg-background-dark min-h-screen">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 h-full">
        {/* Sticky Sidebar (Narrative) */}
        <aside className="lg:col-span-4 lg:sticky lg:top-32 h-fit flex flex-col gap-8 self-start">
          {/* Chapter Label */}
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-primary"></span>
            <span className="font-mono text-xs font-bold text-primary tracking-widest uppercase">Chapter 02</span>
          </div>

          {/* Headline */}
          <h2 className="font-serif-display text-5xl md:text-6xl font-bold leading-[0.9] tracking-tight text-text-main">
            The Chaos <br/>
            <span className="font-light italic text-text-muted">of Forty-Eight</span>
          </h2>

          {/* Body Text */}
          <div className="prose prose-invert prose-lg">
            <p className="font-serif-body text-xl leading-relaxed text-text-muted">
              For the first time in history, 48 nations descend upon the global stage. The expansion brings chaos, calculation, and a new 12-group format.
            </p>
            <p className="font-serif-body text-lg leading-relaxed text-text-muted mt-4">
              Will the giants stumble? Will the underdogs rise? Spin the wheel of fate to determine the initial groupings that will define the tournament's narrative.
            </p>
          </div>

          {/* Actions */}
          <div className="pt-4 flex flex-col gap-4">
            <button
              onClick={handleShuffle}
              disabled={isShuffling}
              className="group relative flex w-full md:w-auto max-w-xs cursor-pointer items-center justify-center overflow-hidden rounded-sm bg-primary px-8 py-4 transition-all hover:bg-primary-dim hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="font-mono text-sm font-bold uppercase tracking-widest text-background-dark z-10 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">
                  {isShuffling ? 'hourglass_empty' : 'shuffle'}
                </span>
                {isShuffling ? 'Distributing...' : 'distribute groups'}
              </span>
              {/* Button Shine Effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0"></div>
            </button>
            <div className="flex items-center gap-2 text-text-muted/60 text-[10px] font-mono uppercase tracking-wider">
              <span className={`w-2 h-2 rounded-full ${isShuffling ? 'bg-primary' : 'bg-accent-blue'} animate-pulse`}></span>
              {isShuffling ? 'Simulating draw...' : 'Awaiting Input'}
            </div>
          </div>

          {/* Stats summary (Decorative) */}
          <div className="mt-8 border-t border-border-subtle pt-6 grid grid-cols-2 gap-6">
            <div>
              <div className="font-mono text-[10px] uppercase text-text-muted mb-1">Total Teams</div>
              <div className="font-mono text-2xl text-text-main">48</div>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase text-text-muted mb-1">Groups</div>
              <div className="font-mono text-2xl text-text-main">12</div>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase text-text-muted mb-1">Simulations</div>
              <div className="font-mono text-2xl text-text-main">10k+</div>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase text-text-muted mb-1">Top Seed</div>
              <div className="font-mono text-2xl text-primary">BRA</div>
            </div>
          </div>
        </aside>

        {/* Right Side: The Grid */}
        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
            {groups.map((group) => (
              <div key={group.id} className="bg-surface border border-border-subtle rounded-sm p-4 hover:border-primary/30 transition-colors group">
                <div className="flex justify-between items-center mb-4 border-b border-border-subtle pb-2">
                  <h3 className="font-mono text-sm font-bold text-primary tracking-wider">GROUP {group.id}</h3>
                  <span className="material-symbols-outlined text-text-muted text-sm opacity-0 group-hover:opacity-100 transition-opacity">grid_view</span>
                </div>

                <div className="space-y-3">
                  {group.teams.map((team, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      {team.flag ? (
                        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center overflow-hidden relative">
                          <img src={team.flag} alt={`${team.name} Flag`} className="w-full h-full object-cover opacity-80" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-[10px] text-text-muted font-mono border border-white/10">?</div>
                      )}

                      <span className={`font-mono text-sm ${isShuffling && idx !== 0 ? 'text-text-muted/50 slot-machine-blur' : 'text-text-main'}`}>
                        {isShuffling && idx !== 0 ? '---' : team.name}
                      </span>

                      {team.host && (
                        <span className="font-mono text-xs text-text-muted ml-auto">HST</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
