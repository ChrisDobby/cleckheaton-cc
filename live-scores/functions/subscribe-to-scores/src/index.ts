import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const documentClient = DynamoDBDocumentClient.from(client);

const TableName = 'cleckheaton-cc-live-score-subscriptions';

export const handler = async ({ body, path }) => {
  console.log(JSON.stringify(body, null, 2));
  const subscription = JSON.parse(body);
  const route = path.split('/').slice(-1)[0];
  const command = route === 'subscribe' ? new PutCommand({ TableName, Item: subscription }) : new DeleteCommand({ TableName, Key: subscription.endpoint });
  await documentClient.send(command as any);

  return { statusCode: 200 };
};
