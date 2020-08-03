'use strict';
const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient();
    let responseBody = '';
    let statusCode = 0;

    const {id} = event.pathParameters;

    const params = {
        TableName: 'project-tracker-users',
        Key: {
            id: id
        }
    };

    try{
        //promise is a utility fx from aws, can be chained to almost any aws function to promise-fy it.
        //allows it to be used with async await
        const data = await documentClient.delete(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 204;
    }catch(err){
        responseBody = `Unable to delete product: ${err}`;
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
};
