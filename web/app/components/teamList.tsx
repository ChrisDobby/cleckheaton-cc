import { Player } from '~/types';
import PlayerSponsor from './playerSponsor';

type Props = { players: Player[] };

const SelectedPlayer = ({ player }: { player: Player }) => (
  <li className='player-line'>
    <p className='player-name'>{player.name.toUpperCase()}</p>
    <PlayerSponsor player={player} />
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
