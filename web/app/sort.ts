import { Event, Fixture, News } from './types';

export const sortEvents = (e1: Event, e2: Event) =>
  e1.eventDate < e2.eventDate ? 1 : -1;
export const sortNews = (n1: News, n2: News) => (n1.date < n2.date ? 1 : -1);

export const sortFixtures = (f1: Fixture, f2: Fixture) => {
  if (f1.matchDate === f2.matchDate) {
    return f1.team === '1st' ? -1 : 1;
  }

  return f1.matchDate < f2.matchDate ? -1 : 1;
};