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
    {fixture.result && (
      <div className='matchday-fixture-result'>{fixture.result}</div>
    )}
    {!fixture.result && <p>Live updates will appear here when available...</p>}
    {!fixture.result && fixture.teamSelection && (
      <div className='matchday-fixture-team-list'>
        <TeamList players={fixture.teamSelection} />
      </div>
    )}
  </article>
);

export default MatchdayFixture;
