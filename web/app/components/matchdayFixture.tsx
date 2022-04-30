import { Link } from 'remix';
import { format } from 'date-fns';
import { Fixture } from '~/types';
import FixtureDescription from './fixtureDescription';
import MatchballSponsor from './matchballSponsor';
import TeamList from './teamList';

type Props = { fixture: Fixture };

const MatchdayFixture = ({ fixture }: Props) => (
  <article className='matchday-fixture'>
    <div className='matchday-fixture-competition-team'>
      <span className='matchday-fixture-team'>{fixture.team} team</span>
      <span className='matchday-fixture-competition'>
        {fixture.competition.name}
      </span>
    </div>
    <FixtureDescription fixture={fixture} />
    <div className='matchday-fixture-details'>
      <h5>Start time</h5>
      <p>{format(new Date(fixture.matchDate), 'HH:mm')}</p>
    </div>
    <MatchballSponsor {...fixture} />
    {!fixture.result && fixture.hasPreview && (
      <Link
        className='matchday-fixture-preview'
        to={`/fixtures/${fixture._id}/preview`}
      >
        Preview
      </Link>
    )}
    {fixture.result && (
      <div className='matchday-fixture-result'>{fixture.result}</div>
    )}
    {fixture.result && fixture.scorecard && (
      <a
        className='matchday-fixture-scorecard'
        href={fixture.scorecard}
        target='_blank'
      >
        Scorecard
      </a>
    )}
    {fixture.hasReport && (
      <Link
        className='matchday-fixture-report'
        to={`/fixtures/${fixture._id}/report`}
      >
        Match report
      </Link>
    )}
    {!fixture.result && <p>Live updates will appear here when available...</p>}
    {!fixture.result &&
      fixture.teamSelection &&
      fixture.teamSelection.length > 0 && (
        <div className='matchday-fixture-team-list'>
          <TeamList players={fixture.teamSelection} />
        </div>
      )}
  </article>
);

export default MatchdayFixture;
