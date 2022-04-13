export type Fixture = {
  _id: string;
  matchDate: string;
  opposition: string;
  preview?: any;
  team: string;
  venue: string;
  result?: string;
  report?: any;
  competition: { name: string };
};

export type Event = {
  _id: string;
  eventDate: string;
  title: string;
  subtitle: string;
};

export type News = {
  _id: string;
  date: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  description: any;
};

export type Sponsor = {
  _id: string;
  title: string;
  imageUrl: string;
  url: string;
  position: number;
};

export type MatchResult = {
  _id: string;
  date: string;
  description: string;
  result: string;
  report?: any;
};

export type MatchPreview = {
  date: string;
  description: string;
  preview: any;
};
