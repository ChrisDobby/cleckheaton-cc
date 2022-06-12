import { Fixture } from '../types';

type Props = { fixture: Fixture };

const LiveScores = ({ fixture }: Props) =>
  fixture.liveScorecard ? <pre>{JSON.stringify(fixture.liveScorecard, null, 4)}</pre> : <p>Live updates will appear here when available...</p>;

export default LiveScores;
