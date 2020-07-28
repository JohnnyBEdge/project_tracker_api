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

    const params = {
        TableName: "Users",
        Key: {
            id: "12345"
        }
    };

    try {
        const data = await documentClient.get(params).promise();
        console.log(data);
    } catch(err) {
        console.log(err);
    };


}