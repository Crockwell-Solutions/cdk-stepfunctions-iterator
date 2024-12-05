/**
 * Seed DynamoDb Items Function
 * 
 * A simple function that populates the DynamoDB table with some seed data.
 * This function is used to demonstrate how Step Functions can be used to 
 * iterate through paginated results from a DynamoDB table.
 */

import { Logger } from '@aws-lambda-powertools/logger';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocument, PutCommand } from '@aws-sdk/lib-dynamodb';
import { randomUUID } from 'crypto';
export const logger = new Logger();

// Import the environment variables
const TABLE_NAME = process.env.TABLE_NAME || '';

// Setup the DynamoDB Document client
const marshallOptions = {
  convertEmptyValues: false, // Whether to automatically convert empty strings, blobs, and sets to `null`.
  removeUndefinedValues: true, // Whether to remove undefined values while marshalling.
  convertClassInstanceToMap: true, // Whether to convert typeof object to map attribute.
};
const unmarshallOptions = {
  wrapNumbers: false, // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
};
const translateConfig = { marshallOptions, unmarshallOptions };
const client = new DynamoDBClient();
const ddbDocClient = DynamoDBDocument.from(client, translateConfig);

/**
 * Lambda Handler
 *
 * @param {object} event - The event object containing the payload passed to this function.
 * @param {object} context - The context object provided by the AWS Lambda runtime.
 */
export async function handler(event: any) {
  logger.info('Processing DynamoDb seed function', { event: event });

  // Create 100 items in DynamoDb
  for (let i = 0; i < 100; i++) {
    const params = {
      TableName: TABLE_NAME,
      Item: {
        PK: 'ItemGroup',
        SK: randomUUID(),
        name: `Item ${i}`,
      },
    };
    await ddbDocClient.send(new PutCommand(params));
  }

  logger.info('DynamoDb seed function completed');

  return {
    statusCode: 200,
    body: JSON.stringify('DynamoDb seed function completed'),
  };
};
