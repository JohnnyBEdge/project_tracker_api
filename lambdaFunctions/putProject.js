'use strict';

const AWS = require('aws-sdk');

exports.handler = async (event, context) => {
    const documentClient = new AWS.DynamoDB.DocumentClient();
    let responseBody = '';
    let statusCode = 0;
    
    const {id, projects} = JSON.parse(event.body);

    const params = {
        TableName: 'project-tracker-users',
        Item: {
            id: id,
            projects: projects
        }
    };
    try{
        const data = await documentClient.put(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 201;
    } catch(err){
        responseBody = `Unable to put user: ${err}`;
        statusCode = 403;
    };
    const response = {
        statusCode: statusCode,
        headers: {
            "Content-Type": "application.json"
        },
        body: responseBody
    };
    return response;
};