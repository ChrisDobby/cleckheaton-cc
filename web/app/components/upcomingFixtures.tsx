import { Fixture } from '../types';

type Props = {
  fixtures: Fixture[];
};

const UpcomingFixtures = ({ fixtures }: Props) => {
  console.log('fixtures', fixtures);
  if (!fixtures.length) {
    return null;
  }

  return (
    <>
      <p style={{ fontSize: '0.875rem' }}>Upcoming fixtures</p>
    </>
  );
};

export default UpcomingFixtures;
