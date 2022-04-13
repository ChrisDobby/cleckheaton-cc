import { Link } from 'remix';
import { MatchResult } from '~/types';

type Props = { result: MatchResult };

const LatestResult = ({ result }: Props) => (
  <div className='latest-result-grid'>
    <div className='latest-result-date'>{result.date}</div>
    <div className='latest-result-description'>
      <p className='latest-result-fixture'>{result.description}</p>
      <p className='latest-result-result'>{result.result}</p>
      {result.report && (
        <Link to={`/match/${result._id}/report`}>Match report</Link>
      )}
    </div>
  </div>
);

export default LatestResult;
