import ScorePieChart from './ScorePieChart';
import type { Score } from '../types';

interface ScoreCardsProps {
  scores: Score;
}

export default function ScoreCards({ scores }: ScoreCardsProps) {
  return (
    <div className="w-full">
      <ScorePieChart scores={scores} />
    </div>
  );
}
