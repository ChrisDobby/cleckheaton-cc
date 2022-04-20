import { MatchResult } from '~/types';
import LatestResult from './latestResult';

type Props = { results: MatchResult[] };

const LatestResults = ({ results }: Props) => {
  if (!results.length) {
    return null;
  }

  return (
    <>
      <p className='latest-results-label'>LATEST RESULTS</p>
      <section className='latest-results-section'>
        <div className='latest-results-grid'>
          {results.map((result) => (
            <LatestResult key={result._id} result={result} />
          ))}
        </div>
      </section>
    </>
  );
};
export default LatestResults;
