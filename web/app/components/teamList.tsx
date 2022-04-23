import { Player } from '~/types';

type Props = { players: Player[] };

const SponsorContent = ({
  sponsor,
  sponsorImageUrl,
}: {
  sponsor?: string;
  sponsorImageUrl?: string;
}) => {
  switch (true) {
    case Boolean(sponsorImageUrl):
      return <img src={sponsorImageUrl} />;
    case Boolean(sponsor):
      return <span>{sponsor}</span>;
    default:
      return <span>Available to sponsor</span>;
  }
};

const PlayerSponsor = ({ player }: { player: Player }) =>
  player.sponsorUrl ? (
    <a className='player-sponsor' href={player.sponsorUrl}>
      <SponsorContent {...player} />
    </a>
  ) : (
    <p className='player-sponsor'>
      <SponsorContent {...player} />
    </p>
  );

const SelectedPlayer = ({ player }: { player: Player }) => (
  <li className='player-line'>
    <p className='player-name'>{player.name.toUpperCase()}</p>
    <PlayerSponsor player={player} />
    <a className='player-sponsor' href='https://dazn.com'>
      DAZN
    </a>
  </li>
);

const TeamList = ({ players }: Props) => (
  <ul className='player-list'>
    {players.map((player) => (
      <SelectedPlayer key={player._id} player={player} />
    ))}
  </ul>
);

export default TeamList;
