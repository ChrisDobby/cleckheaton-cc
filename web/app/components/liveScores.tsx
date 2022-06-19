import { useEffect, useRef, useState } from 'react';
import { BattingInnings, BowlingFigures, Fixture, Innings, LiveScore } from '../types';

type BattingInningsProps = { batting: BattingInnings };
const BattingInnings = ({ batting: { name, runs, balls, fours, sixes, howout } }: BattingInningsProps) => (
  <>
    <div className="scores-batter-name">{name}</div>
    <div className="scores-batter-runs">{runs}</div>
    <div className="scores-batter-balls">{balls}</div>
    <div className="scores-batter-fours">{fours}</div>
    <div className="scores-batter-sixes">{sixes}</div>
    {howout && (
      <div className="scores-batter-howout">
        {howout[0] && <div className="howout-1">{howout[0]}</div>}
        {howout[1] && <div className="howout-2">{howout[1]}</div>}
      </div>
    )}
  </>
);

type BowlingLineProps = { bowling: BowlingFigures };
const BowlingLine = ({ bowling: { name, runs, wickets, overs, maidens } }: BowlingLineProps) => (
  <>
    <div className="scores-bowler-name">{name}</div>
    <div className="scores-bowler-overs">{overs}</div>
    <div className="scores-bowler-maidens">{maidens}</div>
    <div className="scores-bowler-runs">{runs}</div>
    <div className="scores-bowler-wickets">{wickets}</div>
  </>
);

const BattingHeader = () => (
  <>
    <div className="scores-batter-runs scores-batting-header">R</div>
    <div className="scores-batter-balls scores-batting-header">B</div>
    <div className="scores-batter-fours scores-batting-header">4</div>
    <div className="scores-batter-sixes scores-batting-header">6</div>
    <div className="scores-header-separator">&nbsp;</div>
  </>
);

const BowlingHeader = () => (
  <>
    <div className="scores-bowler-name">Bowling</div>
    <div className="scores-bowler-overs scores-batting-header">O</div>
    <div className="scores-bowler-maidens scores-batting-header">M</div>
    <div className="scores-bowler-runs scores-batting-header">R</div>
    <div className="scores-bowler-wickets scores-batting-header">W</div>
    <div className="scores-header-separator">&nbsp;</div>
  </>
);

type InningsProps = { innings: Innings; selected: boolean };
const Innings = ({ innings, selected }: InningsProps) => (
  <div className={`scores-innings-${selected ? 'selected' : 'unselected'}`}>
    <div className="scores-batting">
      <BattingHeader />
      {innings.batting.innings.map(batting => (
        <BattingInnings key={batting.name} batting={batting} />
      ))}
    </div>
    <div className="scores-batting-extras">
      <div className="scores-total-header">Extras</div>
      <div>{innings.batting.extras}</div>
    </div>
    <div className="scores-batting-total">
      <div className="scores-total-header">Total</div>
      <div>{innings.batting.total}</div>
    </div>
    <div className="scores-batting-fow">
      <div className="scores-fow-header">Fall of wickets</div>
      {innings.fallOfWickets}
    </div>
    <div className="scores-bowling">
      <BowlingHeader />
      {innings.bowling.map(bowling => (
        <BowlingLine key={bowling.name} bowling={bowling} />
      ))}
    </div>
  </div>
);

type TabsProps = { innings: Innings[]; selectedIndex: number; onSelect: (index: number) => void };
const Tabs = ({ innings, selectedIndex, onSelect }: TabsProps) => (
  <div className={`scores-tabs ${innings.length === 1 ? 'single-innings' : ''}`}>
    {innings[0] && (
      <button className={selectedIndex === 0 ? 'selected-tab' : ''} onClick={() => onSelect(0)}>
        {innings[0].batting.team}
      </button>
    )}
    {innings[1] && (
      <button className={selectedIndex === 1 ? 'selected-tab' : ''} onClick={() => onSelect(1)}>
        {innings[1].batting.team}
      </button>
    )}
  </div>
);

type ScoreProps = { liveScore: LiveScore };
const Scores = ({ liveScore }: ScoreProps) => {
  const [selectedIndex, setSelectedIndex] = useState(liveScore.length - 1);

  return (
    <div>
      {liveScore.map(({ batting }) => (
        <div key={batting.team} className="scores-total">{`${batting.team} - ${batting.total}`}</div>
      ))}
      <Tabs innings={liveScore} selectedIndex={selectedIndex} onSelect={setSelectedIndex} />
      {liveScore.map((innings, index) => (
        <Innings key={index} innings={innings} selected={selectedIndex === index} />
      ))}
    </div>
  );
};

type Props = { fixture: Fixture; onCardAvailable: () => void };

const LiveScores = ({ fixture, onCardAvailable }: Props) => {
  const [liveScorecard, setLiveScorecard] = useState(fixture.liveScorecard ? fixture.liveScorecard.scorecard : null);
  const timerRef = useRef<NodeJS.Timer | NodeJS.Timeout>();

  useEffect(() => {
    timerRef.current = setInterval(async () => {
      if (fixture.liveScorecard) {
        const scorecardResponse = await fetch(fixture.liveScorecard.url);
        if (scorecardResponse.ok) {
          onCardAvailable();
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
  return liveScorecard ? <Scores liveScore={liveScorecard} /> : <p>Live updates will appear here when available...</p>;
};

export default LiveScores;
