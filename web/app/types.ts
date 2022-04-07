export type Fixture = {
  _id: string;
  matchDate: string;
  opposition: string;
  preview?: string;
  team: string;
  venue: string;
  result?: string;
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
};

export type Sponsor = {
  _id: string;
  title: string;
  imageUrl: string;
  url: string;
  position: number;
};
