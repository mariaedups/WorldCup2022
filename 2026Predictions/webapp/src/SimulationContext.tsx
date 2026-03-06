import React, { createContext, useContext, useState, ReactNode } from 'react';
import simDataRaw from './data/simData.json';

export type TeamName = string;

export interface Match {
  team1: TeamName;
  team2: TeamName;
  score1: number;
  score2: number;
}

export interface Standing {
  team: TeamName;
  pts: number;
  gd: number;
}

export interface SimRun {
  id: number;
  groups: Record<string, TeamName[]>;
  standings: Record<string, Standing[]>;
  knockouts: {
    r32: Match[];
    r16: Match[];
    qf: Match[];
    sf: Match[];
    final: Match[];
  };
}

export interface SimData {
  runs: SimRun[];
  probabilities: { team: TeamName; prob: number }[];
}

const simData = simDataRaw as SimData;

interface SimulationContextProps {
  activeRunIndex: number;
  activeRun: SimRun;
  probabilities: { team: TeamName; prob: number }[];
  randomizeRun: () => void;
}

const SimulationContext = createContext<SimulationContextProps | undefined>(undefined);

export const SimulationProvider = ({ children }: { children: ReactNode }) => {
  const [activeRunIndex, setActiveRunIndex] = useState(0);

  const randomizeRun = () => {
    setActiveRunIndex((prev) => (prev + 1) % simData.runs.length);
  };

  return (
    <SimulationContext.Provider
      value={{
        activeRunIndex,
        activeRun: simData.runs[activeRunIndex],
        probabilities: simData.probabilities,
        randomizeRun,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
};
