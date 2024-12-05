#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { StatelessStack } from '../lib/stacks/stateless-stack';
import { StatefulStack } from '../lib/stacks/stateful-stack';

const app = new cdk.App();
const statefulStack = new StatefulStack(app, 'StepFunctionsIteratorStatefulStack', {});
new StatelessStack(app, 'StepFunctionsIteratorStatelessStack', {
  dynamoDbIteratorTable: statefulStack.dynamoDbIteratorTable,
});
