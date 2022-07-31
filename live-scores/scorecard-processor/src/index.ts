import puppeteer, { ElementHandle, Page } from 'puppeteer';
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';

const oneHourMilliseconds = 60 * 60 * 1000;

let page: Page | null = null;

const sqsClient = new SQSClient({ region: 'eu-west-2' });
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

let lastRefresh = 0;
const refreshPage = async () => {
  console.log('refreshing page');
  await page?.reload({ waitUntil: 'networkidle0' });
  lastRefresh = Date.now();
};

const findScorecardTab = async () => {
  let scorecardTab: ElementHandle<Element> | null | undefined = null;
  while (true) {
    scorecardTab = await page?.$('#nvScorecardTab-tab');
    if (scorecardTab) {
      break;
    }
    console.log('no live scorecard available, waiting to try again..');
    await sleep(300000);
    await refreshPage();
  }

  return scorecardTab;
};

let lastScorecard: string | undefined = '';
let lastHeader: string | undefined = '';
const processScorecardHtml = (queueUrl: string) => async () => {
  if (Date.now() - lastRefresh > oneHourMilliseconds && page) {
    await refreshPage();
    page.$eval('#nvScorecardTab-tab', (el: any) => el.click());
  }

  const scorecardHtml = await page?.$eval('#nvScorecardTab', el => el.innerHTML);
  const headerHtml = await page?.$eval('.container.main-header', el => el.innerHTML);
  if (lastScorecard === scorecardHtml && lastHeader === headerHtml) {
    console.log('has not been updated...');
    return;
  }

  lastScorecard = scorecardHtml;
  lastHeader = headerHtml;
  const command = new SendMessageCommand({
    QueueUrl: queueUrl,
    MessageBody: JSON.stringify({ headerHtml, scorecardHtml }),
  });
  console.log('sending to sqs');
  await sqsClient.send(command);
  console.log('sent');
};

(async () => {
  const scorecardUrl = process.argv[2];
  if (!scorecardUrl) {
    throw new Error('No scorecard url specified');
  }

  const queueUrl = process.argv[3];
  if (!queueUrl) {
    throw new Error('No queue url specified');
  }

  console.log(`processing ${scorecardUrl} and sending to ${queueUrl}`);
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  page = await browser.newPage();
  await page.goto(scorecardUrl);
  lastRefresh = Date.now();

  const [acceptButton] = await page.$x('//button[text()="ACCEPT"]');
  await acceptButton.click();

  await findScorecardTab();
  page.$eval('#nvScorecardTab-tab', (el: any) => el.click());

  setInterval(processScorecardHtml(queueUrl), 60000);
})();
