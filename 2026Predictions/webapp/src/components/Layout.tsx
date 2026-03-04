import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  activeChapter: number;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeChapter }) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col font-body selection:bg-primary selection:text-black">
      {/* Top Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${activeChapter === 1 ? 'mix-blend-difference px-6 py-6 md:px-12 bg-transparent border-none' : 'border-b border-[#2A2E36] bg-background-dark/90 backdrop-blur-md px-6 py-4 lg:px-10'}`}>
        <div className="flex items-center justify-between w-full max-w-[1600px] mx-auto">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-2xl">
              {activeChapter === 1 ? 'stadium' : 'sports_soccer'}
            </span>
            {activeChapter === 1 ? (
              <span className="font-mono text-xs font-bold tracking-widest uppercase text-white/80">Scrollytelling Saga</span>
            ) : (
              <h1 className="font-display font-bold text-lg tracking-tight text-text-main">
                WC 2026 <span className="font-light italic text-text-muted">Simulator</span>
              </h1>
            )}
          </div>

          <div className="hidden md:flex items-center gap-6">
            {activeChapter === 1 ? (
              <span className="font-mono text-[10px] text-white/50 uppercase tracking-widest">Chapter 01</span>
            ) : (
              <nav className="flex items-center gap-8 font-mono text-xs tracking-wider text-text-muted">
                {[
                  { num: 1, label: '01. KICKOFF' },
                  { num: 2, label: '02. THE SHUFFLE' },
                  { num: 3, label: '03. GRIND' },
                  { num: 4, label: '04. CLIMB' },
                  { num: 5, label: '05. CROWN' },
                ].map((item) => (
                  <a
                    key={item.num}
                    href={`#chapter-${item.num}`}
                    className={`transition-colors ${
                      activeChapter === item.num
                        ? 'text-primary font-bold border-b border-primary pb-0.5'
                        : 'hover:text-primary'
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            )}
          </div>

          {activeChapter !== 1 && (
            <div className="flex items-center gap-4">
              <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest hidden sm:block">Probability Engine v2.1</span>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content Area */}
      {children}
    </div>
  );
};
