import { Event } from '../types';
import Events from './events';

type Props = {
  events: Event[];
};

const NewsAndEvents = ({ events }: Props) => (
  <div className='news-events-grid'>
    <Events events={events} />
  </div>
);

export default NewsAndEvents;
