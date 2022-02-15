export type Fixture = {
  _id: string;
  matchDate: string;
  opposition: string;
  preview?: string;
  team: string;
  venue: string;
  competition: { name: string };
};

export type Event = {
  _id: string;
  eventDate: string;
  title: string;
  subtitle: string;
};
