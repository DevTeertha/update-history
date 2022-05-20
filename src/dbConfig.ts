const AWS = require('aws-sdk');

AWS.config.update({
  region: 'local',
  endpoint: 'http://localhost:8000',
});
export const dynamodb = new AWS.DynamoDB();

export const docClient = new AWS.DynamoDB.DocumentClient();

export const params = {
  TableName: 'audit_information',
  KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
  AttributeDefinitions: [{ AttributeName: 'id', AttributeType: 'S' }],
  ProvisionedThroughput: {
    ReadCapacityUnits: 6,
    WriteCapacityUnits: 6,
  },
};
