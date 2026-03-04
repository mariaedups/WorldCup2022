const fs = require('fs');

const file = '2026Predictions/webapp/src/components/Chapter4.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace the array of matches inside the render function with state initialization
const stateAddition = `  const [simulationStep, setSimulationStep] = useState(0);
  const [matchScores, setMatchScores] = useState<number[][]>([
    [0, 0], [0, 0], [0, 0]
  ]);

  const handleSimulate = () => {
    if (simulationStep === 0) {
      setMatchScores([
        [Math.floor(Math.random() * 3), Math.floor(Math.random() * 3)],
        [Math.floor(Math.random() * 3), Math.floor(Math.random() * 3)],
        [Math.floor(Math.random() * 3), Math.floor(Math.random() * 3)]
      ]);
    }
    setSimulationStep(prev => prev >= 4 ? 0 : prev + 1);
  };`;

content = content.replace(
  `  const [simulationStep, setSimulationStep] = useState(0);

  const handleSimulate = () => {
    setSimulationStep(prev => prev >= 4 ? 0 : prev + 1);
  };`,
  stateAddition
);

content = content.replace(
  `<span className="font-mono opacity-50">{simulationStep >= 2 ? Math.floor(Math.random()*3) : '-'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm">{simulationStep >= 1 ? t2 : 'TBD'}</span>
                      <span className="font-mono opacity-50">{simulationStep >= 2 ? Math.floor(Math.random()*3) : '-'}</span>`,
  `<span className="font-mono opacity-50">{simulationStep >= 2 ? matchScores[i][0] : '-'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm">{simulationStep >= 1 ? t2 : 'TBD'}</span>
                      <span className="font-mono opacity-50">{simulationStep >= 2 ? matchScores[i][1] : '-'}</span>`
);

fs.writeFileSync(file, content);
