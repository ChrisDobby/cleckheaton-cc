import { Event, Fixture, News, Sponsor } from './types';

export const sortFixtures = (f1: Fixture, f2: Fixture) => {
  if (f1.matchDate === f2.matchDate) {
    return f1.team === '1st' ? -1 : 1;
  }

  return f1.matchDate < f2.matchDate ? -1 : 1;
};

export const sortSponsors = (s1: Sponsor, s2: Sponsor) =>
  (s1.position || 9999) - (s2.position || 9999);
