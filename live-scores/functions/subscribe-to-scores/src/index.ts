import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const documentClient = DynamoDBDocumentClient.from(client);

const TableName = 'cleckheaton-cc-score-subscriptions';

export const handler = async event => {
  console.log(JSON.stringify(event, null, 2));
  return { statusCode: 200 };
};
