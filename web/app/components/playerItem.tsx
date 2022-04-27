import { Player as PlayerItem } from '../types';
import PlayerSponsor from './playerSponsor';

type Props = { player: PlayerItem };

const PlayerItem = ({ player }: Props) => (
  <div className='player-item'>
    <h4 className='player-name'>{player.name}</h4>
    {player.imageUrl && <img className='player-image' src={player.imageUrl} />}
    {!player.imageUrl && (
      <div className='player-image'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 512 512'
          fill='#fff'
          height='180'
        >
          <path d='M256 288c79.53 0 144-64.47 144-144s-64.47-144-144-144c-79.52 0-144 64.47-144 144S176.5 288 256 288zM351.1 320H160c-88.36 0-160 71.63-160 160c0 17.67 14.33 32 31.1 32H480c17.67 0 31.1-14.33 31.1-32C512 391.6 440.4 320 351.1 320z' />
        </svg>
      </div>
    )}
    <PlayerSponsor player={player} />
  </div>
);

export default PlayerItem;