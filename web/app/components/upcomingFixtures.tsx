import { format } from 'date-fns';
import { Link } from 'remix';

import { Fixture } from '../types';

type Props = {
  fixtures: Fixture[];
};

const Fixture = ({ fixture }: { fixture: Fixture }) => {
  const homeTeam =
    fixture.venue === 'Home' ? 'Cleckheaton' : fixture.opposition;
  const awayTeam =
    fixture.venue === 'Home' ? fixture.opposition : 'Cleckheaton';

  return (
    <article className='fixture'>
      <h4 className='fixture-date-team'>
        <span className='fixture-date'>
          {format(new Date(fixture.matchDate), 'dd-MMM (HH:mm)')}
        </span>
        <span>{`${fixture.team} team`}</span>
      </h4>
      <h5 className='fixture-competition'>{fixture.competition.name}</h5>
      <p className='fixture-description'>
        {homeTeam}
        <br />
        vs
        <br />
        {awayTeam}
      </p>
      <div className='fixture-preview-link'>
        {fixture.preview && <Link to={`/preview/${fixture._id}`}>Preview</Link>}
      </div>
    </article>
  );
};

const UpcomingFixtures = ({ fixtures }: Props) => {
  if (!fixtures.length) {
    return null;
  }

  return (
    <>
      <p className='fixtures-label'>UPCOMING FIXTURES</p>
      <div className='fixtures-container'>
        {fixtures.map((fixture) => (
          <Fixture key={fixture._id} fixture={fixture} />
        ))}
      </div>
    </>
  );
};

export default UpcomingFixtures;
