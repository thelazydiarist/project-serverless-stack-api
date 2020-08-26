import * as uuid from 'uuid';
import handler from './libs/handler-lib';
import dynamoDb from './libs/dynamodb-lib';

export const main = handler(async (event, context) => {
  //Request body is parsed in as a JSON encoded string
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.tableName,
    //'Item' contains the attributes of the item to be created
    //'userId': user identities are federated through cognito identity pool, we will use the identity id
    //as the user id of the authenticated user
    //'noteId': a unique uuid
    //'content': parsed from request body
    //'attachment': parsed from request body
    //'createdAt': current Unix timestamp
    Item: {
      userid: event.requestContext.identity.cognitoIdentityId,
      noteid: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      createdAt: Date.now(),
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});
