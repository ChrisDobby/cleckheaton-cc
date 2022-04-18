import { format } from 'date-fns';
import { Link } from 'remix';
import SwipeableViews from 'react-swipeable-views';

import { Fixture } from '../types';
import MatchballSponsor from './matchBallSponsor';

type Props = {
  fixtures: Fixture[];
  swipeable?: boolean;
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
      <MatchballSponsor {...fixture} />
      <div className='fixture-preview-link'>
        {fixture.preview && (
          <Link to={`/fixtures/${fixture._id}/preview`}>Preview</Link>
        )}
      </div>
    </article>
  );
};

const UpcomingFixtures = ({ fixtures, swipeable }: Props) => {
  if (!fixtures.length) {
    return null;
  }

  const fixturesList = fixtures.map((fixture) => (
    <Fixture key={fixture._id} fixture={fixture} />
  ));

  const fixturesContainerContent = swipeable ? (
    <SwipeableViews style={{ padding: '0 30px' }}>
      {fixturesList}
    </SwipeableViews>
  ) : (
    fixturesList
  );

  return (
    <div className={`fixtures-${swipeable ? 'swipeable' : 'list'}`}>
      <p className='fixtures-label'>UPCOMING FIXTURES</p>
      <div className='fixtures-container'>{fixturesContainerContent}</div>
    </div>
  );
};

export default UpcomingFixtures;
