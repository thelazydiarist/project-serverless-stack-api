//returns an array of note objects

import handler from './libs/handler-lib';
import dynamoDB from './libs/dynamodb-lib';

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.tableName,
    //'KeyConditionExpression' defines the condition for the query
    //-'userid = :userid': only return items with matching 'userid'
    //  partition key
    //'ExpressionAttributeValues' defines the value in the condition
    // - ':userid': defines 'userid' to be Identity Pool identity id
    //      of the authenticated user
    KeyConditionExpression: 'userid = :userid',
    ExpressionAttributeValues: {
      ':userid': event.requestContext.identity.cognitoIdentityId,
    },
  };

  const result = await dynamoDB.query(params);

  //Return the matching list of items in response body
  return result.Items;
});
