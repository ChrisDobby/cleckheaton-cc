import { Scorecard, Update } from '@cleckheaton-ccc-live-scores/schema';
import { getOvers } from '@cleckheaton-ccc-live-scores/common';
import { Push } from './types';

const isPushRequired = (overs: number[], lastPush: Push) => {
  const lastPushedOvers = lastPush.inningsNumber === overs.length ? lastPush.overs : 0;
  return overs[overs.length - 1] - lastPushedOvers >= 5;
};

export const getUpdate = (scorecard: Scorecard, lastPush: Push) => {
  const overs = getOvers(scorecard);
  if (!isPushRequired(overs, lastPush)) {
    return { updates: [], push: null };
  }

  return {
    updates: [{ type: 'overs', team: scorecard.teamName, text: scorecard.innings[scorecard.innings.length - 1].batting.team }],
    push: { inningsNumber: overs.length, overs: overs[overs.length - 1] },
  };
};
