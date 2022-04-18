type Props = { matchballSponsor?: string; matchballSponsorUrl?: string };

const MatchballSponsor = ({ matchballSponsor, matchballSponsorUrl }: Props) => {
  if (!matchballSponsor) {
    return null;
  }

  const sponsorText = matchballSponsorUrl ? (
    <a href={matchballSponsorUrl} target='_blank'>
      {matchballSponsor}
    </a>
  ) : (
    <span>{matchballSponsor}</span>
  );

  return (
    <p className='matchball-sponsor-line'>
      Matchball sponsored by {sponsorText}
    </p>
  );
};

export default MatchballSponsor;
