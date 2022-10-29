import { Link } from 'remix';

type Props = { season: number; fixtureCount: number; isCurrentSeason: boolean };
const FixturesHeader = ({ season, fixtureCount, isCurrentSeason }: Props) => {
  return (
    <div className="fixtures-header">
      {fixtureCount > 0 && <p>Season {season} Fixtures</p>}
      {fixtureCount === 0 && <p>There are no fixtures available for the {season} season</p>}
      {isCurrentSeason && (
        <Link className="fixture-preview" to={`/fixtures?season=${season - 1}`}>
          Last seasons fixtures and results
        </Link>
      )}
    </div>
  );
};

export default FixturesHeader;
