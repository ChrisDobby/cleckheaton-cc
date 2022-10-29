import { Link } from 'remix';

type Props = { season: string; fixtureCount: number };
const FixturesHeader = ({ season, fixtureCount }: Props) => {
  return (
    <div className="fixtures-header">
      {fixtureCount > 0 && <p>Season {season} Fixtures</p>}
      {fixtureCount === 0 && <p>There are no fixtures available for the {season} season</p>}
      <Link className="fixture-preview" to={`/last-season`}>
        Last seasons fixtures and results
      </Link>
    </div>
  );
};

export default FixturesHeader;
