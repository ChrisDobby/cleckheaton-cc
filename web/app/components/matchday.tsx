import { Fixture } from '~/types';
import MatchdayFixture from './matchdayFixture';

type Props = { day: string; fixtures: Fixture[] };

const Matchday = ({ day, fixtures }: Props) => {
  if (!fixtures.length) {
    return null;
  }

  return (
    <div className='matchday'>
      <p className='matchday-label'>{day}</p>
      {fixtures.map((fixture) => (
        <MatchdayFixture key={fixture._id} fixture={fixture} />
      ))}
    </div>
  );
};

export default Matchday;
