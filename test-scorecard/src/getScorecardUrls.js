import puppeteer from 'puppeteer';

const BASE_URL = 'https://bradfordcl.play-cricket.com';

const getScorecardUrlForRow = async (row) => {
  if (!row) {
    return null;
  }

  const onclick = await row.getProperty('onclick');
  if (!onclick) {
    return null;
  }

  const func = onclick._remoteObject.description;
  const relativeUrl = func.substring(
    func.indexOf("window.open('/website") + 13,
    func.indexOf("',")
  );

  return `${BASE_URL}${relativeUrl}`;
};

const getTeamRow = async (row) => {
  const anchor = await row.$('a');
  const team = await anchor.getProperty('textContent');
  return { row, team: await team.jsonValue() };
};

const getCleckheatonScorecardUrls = async (page) => {
  const rows = await page.$$('tr');
  const teamRows = await Promise.all(rows.map(getTeamRow));
  const firstTeamRow = teamRows.find(
    ({ team }) => team === 'Cleckheaton CC - 1st XI'
  )?.row;
  const secondTeamRow = teamRows.find(
    ({ team }) => team === 'Cleckheaton CC - 2nd XI'
  )?.row;

  return {
    firstTeam: await getScorecardUrlForRow(firstTeamRow),
    secondTeam: await getScorecardUrlForRow(secondTeamRow),
  };
};

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(
    'https://bradfordcl.play-cricket.com/website/web_pages/315262'
  );

  const [acceptButton] = await page.$x('//button[text()="ACCEPT"]');
  await acceptButton.click();

  const urls = await getCleckheatonScorecardUrls(page);
  console.log(urls);

  browser.close();
})();
