'use strict'
const AWS = require('aws-sdk');

AWS.config.update({ region: "us-west-2"});

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient({ region: "us-west-2"});
  let responseBody = '';
  let statusCode = 0;

  const params = {
    TableName: "project-tracker-users",
    Key: {
      id: "12345"
    }
  }

    try{
        //promise is a utility fx from aws, can be chained to almost any aws function to promise-fy it.
        //allows it to be used with async await
        const data = await documentClient.scan(params).promise();
        responseBody = JSON.stringify(data).Items;
        statusCode = 200;
    }catch(err){
        responseBody = `Unable to get products: ${err}`;
        statusCode = 403;
    }
    const response = {
        statusCode: statusCode,
        headers: {
            "Content-Type": "application/json"
        },
        body: responseBody
    };
    return response;
}

// 'use strict';

// const AWS = require('aws-sdk');

// exports.handler = async (event, context) => {
//     const documentClient = new AWS.DynamoDB.DocumentClient();
//     let responseBody = '';
//     let statusCode = 0;

//     const params = {
//         TableName: 'project-tracker-users',
//         Item: {
//             id: "12345"
//         }
//     };

//     try{
//         const data = await documentClient.scan(params).promise();
//         responseBody = JSON.stringify(data);
//         statusCode = 200;
//     } catch(err){
//         responseBody = `Unable to get users: ${err}`;
//         statusCode = 403;
//     };

//     const response = {
//         statusCode: statusCode,
//         headers: {
//             "Content-Type": "application.json"
//         },
//         body: responseBody
//     };
//     return response;
// };
