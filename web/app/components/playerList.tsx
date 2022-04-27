import { Player } from '~/types';
import PlayerItem from './playerItem';

type Props = { players: Player[] };

const Players = ({ players }: Props) => (
  <div className='player-list'>
    {players.map((player) => (
      <PlayerItem key={player._id} player={player} />
    ))}
  </div>
);
export default Players;
