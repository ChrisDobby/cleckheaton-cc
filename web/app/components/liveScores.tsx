import { useEffect, useRef, useState } from 'react';
import { Fixture } from '../types';

type Props = { fixture: Fixture };

const LiveScores = ({ fixture }: Props) => {
  const [liveScorecard, setLiveScorecard] = useState(fixture.liveScorecard ? fixture.liveScorecard.scorecard : null);
  const timerRef = useRef<NodeJS.Timer | NodeJS.Timeout>();

  useEffect(() => {
    timerRef.current = setInterval(async () => {
      if (fixture.liveScorecard) {
        const scorecardResponse = await fetch(fixture.liveScorecard.url);
        if (scorecardResponse.ok) {
          setLiveScorecard(await scorecardResponse.json());
        }
      }
    }, 60000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);
  return liveScorecard ? <pre>{JSON.stringify(liveScorecard, null, 4)}</pre> : <p>Live updates will appear here when available...</p>;
};

export default LiveScores;
