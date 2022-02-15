import { Event } from '../types';
import EventLine from './eventLine';

type Props = { events: Event[] };

const Events = ({ events }: Props) => (
  <article className='events-list'>
    <h4 className='events-header'>CLUB EVENTS</h4>
    <div className='event-grid'>
      {events.map((event) => (
        <EventLine key={event._id} event={event} />
      ))}
    </div>
  </article>
);

export default Events;
