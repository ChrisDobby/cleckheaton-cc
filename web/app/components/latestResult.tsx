import { Link } from 'remix';
import { MatchResult } from '~/types';

type Props = { result: MatchResult };

const LatestResult = ({ result }: Props) => (
  <>
    <div className='latest-result-date'>{result.date}</div>
    <div className='latest-result-description'>
      <p className='latest-result-fixture'>{result.description}</p>
      <p className='latest-result-result'>{result.result}</p>
      <p className='latest-result-single-line'>
        <strong>{result.description}</strong>: {result.result}
      </p>
      {result.report && (
        <Link
          className='latest-result-report'
          to={`/match/${result._id}/report`}
        >
          Match report
        </Link>
      )}
      {result.scorecard && (
        <a
          className='latest-result-scorecard'
          href={result.scorecard}
          target='_blank'
        >
          Scorecard
        </a>
      )}
    </div>
  </>
);

export default LatestResult;
