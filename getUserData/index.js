'use strict'
const AWS = require('aws-sdk');


AWS.config.update({region: "us-west-1"});

//handler is the fx being exported with index being the exported file
//takes 3 args by default: event- info that triggered the lambda; context- methods and props that provide
// information abvout the invocation, function and execution environment. 
exports.handler = async (event, context) => {
    const ddb = new AWS.DynamoDB({apiVersion: "2012-10-08"});
    //gets rid of needing to go into Dynamo's S value to get id
    const documentClient = new AWS.DynamoDB.DocumentClient({region: "us-west-1"});

    let res = "";
    let statusCode = 0;

    const {id} = event.pathParameters;

    const params = {
        TableName: "Users",
        Key: {
            id: id
        }
    };

    try {
        const data = await documentClient.get(params).promise();
        res = JSON.stringify(data.Item);
        statusCode = 200;
    } catch(err) {
        res =  "Unable to get user data";
        statusCode = 403;
    };

    const response = {
        statusCode: statusCode,
        headers: {
            "myHeader": "test"
        },
        body: res
    };

    return response;

}