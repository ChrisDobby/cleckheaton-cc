import { Sponsor } from '~/types';

type Props = { sponsor: Sponsor };

const SponsorItem = ({ sponsor }: Props) => {
  const { title, url, imageUrl } = sponsor;

  return (
    <div className='sponsor-item'>
      <a href={url} target='_blank' rel='noopener noreferrer'>
        <img src={imageUrl} alt={title} />
      </a>
    </div>
  );
};

export default SponsorItem;
