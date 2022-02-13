import { format } from 'date-fns';
import { Link } from 'remix';

import { Fixture } from '../types';

type Props = {
  fixtures: Fixture[];
};

const Fixture = ({ fixture }: { fixture: Fixture }) => {
  const homeTeam =
    fixture.venue === 'Home' ? `${fixture.team} team` : fixture.opposition;
  const awayTeam =
    fixture.venue === 'Home' ? fixture.opposition : `${fixture.team} team`;

  return (
    <article className='fixture'>
      <h4 className='fixture-date'>
        {format(new Date(fixture.matchDate), 'dd-MMM (HH:mm)')}
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
      <p style={{ fontSize: '0.875rem' }}>Upcoming fixtures</p>
      <div className='fixtures-container'>
        {fixtures.map((fixture) => (
          <Fixture key={fixture._id} fixture={fixture} />
        ))}
      </div>
    </>
  );
};

export default UpcomingFixtures;
