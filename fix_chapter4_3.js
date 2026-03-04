const fs = require('fs');
const file = '2026Predictions/webapp/src/components/Chapter4.tsx';
let content = fs.readFileSync(file, 'utf8');

// I might have replaced it incorrectly the first time. Let's do it cleanly.

content = content.replace(
  `  const [simulationStep, setSimulationStep] = useState(0);

  const handleSimulate = () => {
    setSimulationStep(prev => prev >= 4 ? 0 : prev + 1);
  };`,
  `  const [simulationStep, setSimulationStep] = useState(0);
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
  };`
);

fs.writeFileSync(file, content);
