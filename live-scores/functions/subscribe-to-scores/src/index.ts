import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const documentClient = DynamoDBDocumentClient.from(client);

const TableName = 'cleckheaton-cc-live-score-subscriptions';

export const handler = async event => {
  console.log(JSON.stringify(event.body, null, 2));
  await documentClient.send(
    new PutCommand({
      TableName,
      Item: JSON.parse(event.body),
    }),
  );

  return { statusCode: 200 };
};
