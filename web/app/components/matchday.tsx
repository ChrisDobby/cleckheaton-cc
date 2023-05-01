import { Fixture } from '~/types';
import MatchdayFixture from './matchdayFixture';

type Props = { day: string; fixtures: Fixture[]; isLive?: boolean };

const Matchday = ({ day, fixtures, isLive }: Props) => {
  if (!fixtures.length) {
    return null;
  }

  return (
    <>
      <p className="matchday-label">{day}</p>
      <div className="matchday">
        {fixtures.map(fixture => (
          <MatchdayFixture key={fixture._id} fixture={fixture} isLive={isLive} />
        ))}
      </div>
    </>
  );
};

export default Matchday;
