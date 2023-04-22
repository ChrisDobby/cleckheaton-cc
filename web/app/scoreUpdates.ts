const teamEventName = {
  firstTeam: 'firstTeamScoreUpdate',
  secondTeam: 'secondTeamScoreUpdate',
};

const registerForScorecardUpdates = () => {
  const socket = new WebSocket(`${window.ENV.UPDATES_WEB_SOCKET_URL}`);
  socket.addEventListener('open', () => {
    console.log('Connected to updates web socket');
  });

  socket.addEventListener('message', event => {
    console.log('received', event.data);

    const scorecard = JSON.parse(event.data);
    window.dispatchEvent(new CustomEvent(teamEventName[scorecard.teamName as 'firstTeam' | 'secondTeam'], { detail: scorecard }));
  });
};

export { registerForScorecardUpdates };
