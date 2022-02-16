import { Carousel } from 'react-responsive-carousel';
import { News } from '../types';
import NewsItem from './newsItem';

type Props = { news: News[] };

const NewsCarousel = ({ news }: Props) => (
  <Carousel className='news-carousel' showStatus={false} autoPlay infiniteLoop>
    {news.map((newsItem) => (
      <NewsItem key={newsItem._id} newsItem={newsItem} />
    ))}
  </Carousel>
);

export default NewsCarousel;
