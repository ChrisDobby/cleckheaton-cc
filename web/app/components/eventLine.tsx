import { Event } from '../types';
import { format } from 'date-fns';

type Props = {
  event: Event;
};

const EventLine = ({ event }: Props) => {
  const eventDate = new Date(event.eventDate);
  return (
    <>
      <div className='event-date'>
        <h5>{format(eventDate, 'dd-MMM')}</h5>
      </div>
      <div className='event-info'>
        <h5 className='event-title'>{event.title}</h5>
        <p className='event-subtitle'>{event.subtitle}</p>
      </div>
    </>
  );
};

export default EventLine;
