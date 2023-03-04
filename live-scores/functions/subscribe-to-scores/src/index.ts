import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { validateWebNotification } from '@cleckheaton-ccc-live-scores/schema';
import { addToWebNotifyQueue } from './sqs';

const client = new DynamoDBClient({});
const documentClient = DynamoDBDocumentClient.from(client);

const TableName = 'cleckheaton-cc-live-score-subscriptions';

const subscribe = async (subscription: any) => {
  await documentClient.send(new PutCommand({ TableName, Item: subscription }));
  await addToWebNotifyQueue(validateWebNotification({ subscription, title: 'Cleckheaton CC', body: 'You are now subscribed to live score updates of all 1st and 2nd Team games' }));
};

const unsubscribe = async (endpoint: string) => {
  await documentClient.send(new DeleteCommand({ TableName, Key: { endpoint } }));
};

export const handler = async ({ body, path }) => {
  console.log(JSON.stringify(body, null, 2));
  const subscription = JSON.parse(body);
  const route = path.split('/').slice(-1)[0];
  await (route === 'subscribe' ? subscribe(subscription) : unsubscribe(subscription.endpoint));

  return { statusCode: 200 };
};
