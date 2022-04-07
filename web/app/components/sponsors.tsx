import { Carousel } from 'react-responsive-carousel';
import { Sponsor } from '~/types';
import SponsorItem from './sponsorItem';

type Props = { sponsors: Sponsor[] };

const SponsorsCarousel = ({ sponsors }: Props) => (
  <Carousel
    showStatus={false}
    autoPlay
    infiniteLoop
    showArrows={false}
    showIndicators={false}
    stopOnHover={false}
    interval={5000}
  >
    {sponsors.map((sponsor) => (
      <SponsorItem key={sponsor._id} sponsor={sponsor} />
    ))}
  </Carousel>
);

const Sponsors = (props: Props) => (
  <>
    <p className='sponsors-label'>OUR VALUED SPONSORS</p>
    <div className='sponsors-carousel'>
      <SponsorsCarousel {...props} />
    </div>
  </>
);

export default Sponsors;
