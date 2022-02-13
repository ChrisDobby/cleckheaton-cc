export type Fixture = {
  _id: string;
  matchDate: string;
  opposition: string;
  preview?: string;
  team: string;
  venue: string;
  competition: { name: string };
};
