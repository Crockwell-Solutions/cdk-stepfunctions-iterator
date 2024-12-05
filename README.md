# Step Functions Iterator

A sample CDK Typescript Project that creates a Step Function that demonstrates the Iterator pattern. This pattern is useful when you need to iterate and fetch items from a data source, such as a DynamoDb table, and process them in a Step Function. Traditionally this was difficult to do with Step Functions, but with the introduction of JSONata support and Step Function variables, this is now much simpler.

## Description

## Installation

Ensure you have the basic setup you will need. Follow the [CDK Installation Guide](https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html) to install CDK and bootstrap your target account

> Ensure that CloudTrail is enabled in your account. This is not performed by the CDK and must be done manually. In many cases, this will be managed by a centralized service such as AWS Control Tower.

Install the dependencies
```
npm install
```

Deploy the project
```
npx cdk deploy --all
```

## Configuration

## Usage

To see how this works, deploy the demo repo and run the `SeedDynamoDbFunction`. This creates 100 item in DynamoDb that we can use in the Step Function demonstrate the Iterator pattern.

```
aws lambda invoke --function-name SeedDynamoDbFunction outfile.txt
```

## Cleaning Up

Remove the project when you are finished:
```
npx cdk destroy
```

## License

MIT License

Copyright (c) [2024] [Ian Brumby]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

