import { Player } from '~/types';

type Props = { player: Player };

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

const PlayerSponsor = ({ player }: Props) =>
  player.sponsorUrl ? (
    <a className='player-sponsor' href={player.sponsorUrl} target='_blank'>
      <SponsorContent {...player} />
    </a>
  ) : (
    <p className='player-sponsor'>
      <SponsorContent {...player} />
    </p>
  );

export default PlayerSponsor;
