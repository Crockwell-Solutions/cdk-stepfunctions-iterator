import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { AttributeType, BillingMode, StreamViewType, Table, TableEncryption } from 'aws-cdk-lib/aws-dynamodb';

export class StatefulStack extends Stack {
  // Export from this stack
  public readonly dynamoDbIteratorTable: Table;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Create a DynamoDB table that will be used to store the state of the state machine
    this.dynamoDbIteratorTable = new Table(this, 'DynamoDbIteratorTable', {
      tableName: 'DynamoDbIteratorTable',
      billingMode: BillingMode.PAY_PER_REQUEST,
      encryption: TableEncryption.AWS_MANAGED,
      partitionKey: { name: 'PK', type: AttributeType.STRING },
      sortKey: { name: 'SK', type: AttributeType.STRING },
      timeToLiveAttribute: 'ttl',
      contributorInsightsEnabled: true,
      stream: StreamViewType.NEW_AND_OLD_IMAGES,
    });
  }
}
