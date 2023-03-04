import { Update, validateUpdate } from '@cleckheaton-ccc-live-scores/schema';
import { push } from './push';
import { getSubscriptions } from './dynamo';

const getTitle = (update: Update) => {
  switch (update.team) {
    case 'firstTeam':
      return '1st Team';
    case 'secondTeam':
      return '2nd Team';
    default:
      return 'Cleckheaton CC';
  }
};

const getBody = ({ type, text }: Update) => (type === 'wicket' ? `WICKET: ${text}` : text);

const createNotification = (update: Update) => ({ title: getTitle(update), body: getBody(update) });

const handleMessage = async (message: unknown) => {
  console.log('Received message', message);
  await push(createNotification(validateUpdate(message)), await getSubscriptions());
};

export const handler = async ({ Records }) => {
  await Promise.all(Records.map(({ Sns: { Message } }) => handleMessage(JSON.parse(Message))));
};
