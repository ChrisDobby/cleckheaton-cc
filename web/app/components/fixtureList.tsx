import { Link } from 'remix';
import { format } from 'date-fns';
import { sortFixtures } from '~/sort';
import { Fixture } from '~/types';

type FixtureProps = { fixture: Fixture };
const Fixture = ({ fixture }: FixtureProps) => (
  <>
    <div className='fixture-date'>
      {format(new Date(fixture.matchDate), 'dd-MMM (HH:mm)')}
    </div>
    <div className='fixture-description'>
      <p className='fixture-opposition'>{`${fixture.opposition} (${fixture.venue})`}</p>
      <p className='fixture-competition'>{fixture.competition.name}</p>
    </div>
    {fixture.preview && (
      <Link className='fixture-preview' to={`/fixtures/${fixture._id}/preview`}>
        Preview
      </Link>
    )}
    {fixture.result && <div className='fixture-result'>{fixture.result}</div>}
    {fixture.scorecard && (
      <a className='fixture-scorecard' href={fixture.scorecard} target='_blank'>
        Scorecard
      </a>
    )}
    {fixture.report && (
      <Link className='fixture-report' to={`/fixtures/${fixture._id}/report`}>
        Match report
      </Link>
    )}
  </>
);

type Props = { header: string; fixtures: Fixture[] };

const FixtureList = ({ header, fixtures }: Props) => (
  <article className='fixture-list'>
    <h4 className='fixture-list-header'>{header}</h4>
    <div className='fixture-grid'>
      {fixtures.sort(sortFixtures).map((fixture) => (
        <Fixture key={fixture._id} fixture={fixture} />
      ))}
    </div>
  </article>
);

export default FixtureList;
