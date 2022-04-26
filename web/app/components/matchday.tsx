import { Fixture } from '~/types';
import MatchdayFixture from './matchdayFixture';

type Props = { day: string; fixtures: Fixture[] };

const Matchday = ({ day, fixtures }: Props) => {
  if (!fixtures.length) {
    return null;
  }

  return (
    <>
      <p className='matchday-label'>{day}</p>
      <div className='matchday'>
        {fixtures.map((fixture) => (
          <MatchdayFixture key={fixture._id} fixture={fixture} />
        ))}
      </div>
    </>
  );
};

export default Matchday;
