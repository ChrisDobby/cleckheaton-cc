import { Fixture } from '~/types';

type Props = { fixture: Fixture };

const FixtureDescription = ({ fixture }: Props) => {
  const homeTeam =
    fixture.venue === 'Home' ? 'Cleckheaton' : fixture.opposition;
  const awayTeam =
    fixture.venue === 'Home' ? fixture.opposition : 'Cleckheaton';

  return (
    <p className='fixture-description'>
      {homeTeam}
      <br />
      vs
      <br />
      {awayTeam}
    </p>
  );
};

export default FixtureDescription;
