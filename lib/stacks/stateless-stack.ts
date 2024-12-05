import { Duration, RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CustomLambda } from '../constructs/custom-lambda';
import { Table } from 'aws-cdk-lib/aws-dynamodb';
import {
  DefinitionBody,
  StateMachine,
  StateMachineProps,
  StateMachineType,
  LogLevel,
} from 'aws-cdk-lib/aws-stepfunctions';
import { LogGroup, RetentionDays } from 'aws-cdk-lib/aws-logs';

export interface StatelessStackProps extends StackProps {
  readonly dynamoDbIteratorTable: Table;
}

export class StatelessStack extends Stack {
  constructor(scope: Construct, id: string, props: StatelessStackProps) {
    super(scope, id, props);

    // Create a Lambda function that will seed some items into DynamoDb
    const seedDynamoDbFunction = new CustomLambda(this, 'SeedDynamoDbFunction', {
      path: 'src/seed-dynamodb-function.ts',
      environmentVariables: {
        TABLE_NAME: props.dynamoDbIteratorTable.tableName,
      },
    }).lambda;
    props.dynamoDbIteratorTable.grantReadWriteData(seedDynamoDbFunction);

    // Setup the log group for the state machine
    const stepFunctionLogGroup = new LogGroup(this, 'DynamoDbIterator-Logs', {
      logGroupName: '/aws/vendedlogs/states/stepfunctions/DynamoDbIterator',
      retention: RetentionDays.THREE_MONTHS,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    // Create a step function that will iterate over the items in the DynamoDb table
    const stepFunctionIterator = new StateMachine(this, id, {
      stateMachineName: 'StepFunctionIterator',
      stateMachineType: StateMachineType.EXPRESS,
      timeout: Duration.minutes(5),
      tracingEnabled: true,
      logs: {
        destination: stepFunctionLogGroup,
        level: LogLevel.ALL,
        includeExecutionData: true,
      },
      definitionBody: DefinitionBody.fromFile('lib/stacks/dynamodb-iterator.asl.json', {}),
      definitionSubstitutions: {
        TABLE_NAME: props.dynamoDbIteratorTable.tableName,
      },
    });
    props.dynamoDbIteratorTable.grantFullAccess(stepFunctionIterator);
  }
}
