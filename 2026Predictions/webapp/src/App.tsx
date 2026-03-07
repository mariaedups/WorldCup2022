import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Layout } from './components/Layout';
import { Chapter1 } from './components/Chapter1';
import { Chapter2 } from './components/Chapter2';
import { Chapter3 } from './components/Chapter3';
import { Chapter4 } from './components/Chapter4';
import { Chapter5 } from './components/Chapter5';
import { SimulationProvider } from './SimulationContext';

const App: React.FC = () => {
  const [activeChapter, setActiveChapter] = useState<number>(1);

  // Intersection observers for each chapter
  const [ref1, inView1] = useInView({ threshold: 0.5 });
  const [ref2, inView2] = useInView({ threshold: 0.5 });
  const [ref3, inView3] = useInView({ threshold: 0.5 });
  const [ref4, inView4] = useInView({ threshold: 0.5 });
  const [ref5, inView5] = useInView({ threshold: 0.5 });

  useEffect(() => {
    if (inView1) setActiveChapter(1);
    else if (inView2) setActiveChapter(2);
    else if (inView3) setActiveChapter(3);
    else if (inView4) setActiveChapter(4);
    else if (inView5) setActiveChapter(5);
  }, [inView1, inView2, inView3, inView4, inView5]);

  return (
    <SimulationProvider>
      <Layout activeChapter={activeChapter}>
        <main className="w-full">
          <div id="chapter-1" ref={ref1}>
            <Chapter1 />
          </div>
          <div id="chapter-2" ref={ref2}>
            <Chapter2 />
          </div>
          <div id="chapter-3" ref={ref3}>
            <Chapter3 />
          </div>
          <div id="chapter-4" ref={ref4}>
            <Chapter4 />
          </div>
          <div id="chapter-5" ref={ref5}>
            <Chapter5 />
          </div>
        </main>
      </Layout>
    </SimulationProvider>
  );
};

export default App;
