export type Player = {
  _id: string;
  name: string;
  imageUrl?: string;
  sponsor?: string;
  sponsorUrl?: string;
  sponsorImageUrl?: string;
};

export type Fixture = {
  _id: string;
  matchDate: string;
  opposition: string;
  hasPreview: boolean;
  team: string;
  venue: string;
  result?: string;
  hasReport: boolean;
  scorecard?: string;
  matchballSponsor?: string;
  matchballSponsorUrl?: string;
  competition: { name: string };
  teamSelection?: Player[];
  liveScorecard?: { url: string; scorecard?: LiveScore };
};

export type DetailedFixture = Fixture & {
  report?: any;
  preview?: any;
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
  scorecard?: string;
  hasReport: boolean;
};

export type MatchPreview = {
  date: string;
  description: string;
  preview: any;
};

export type MatchReport = {
  _id: string;
  date: string;
  description: string;
  result: string;
  scorecard?: string;
  report: any;
};

export type MatchDay = {
  todaysFixtures: Fixture[];
  tomorrowsFixtures: Fixture[];
  yesterdaysFixtures: Fixture[];
};

export type BattingInnings = {
  name: string;
  runs: string;
  balls: string;
  minutes: string;
  fours: string;
  sixes: string;
  strikeRate: string;
  howout: string[];
};

export type BowlingFigures = {
  name: string;
  overs: string;
  maidens: string;
  runs: string;
  wickets: string;
  wides: string;
  noBalls: string;
  economyRate: string;
};

type Batting = {
  team: string;
  innings: BattingInnings[];
  total: string;
  extras: string;
};

export type Innings = {
  batting: Batting;
  fallOfWickets: string;
  bowling: BowlingFigures[];
};

export type LiveScore = Innings[];
