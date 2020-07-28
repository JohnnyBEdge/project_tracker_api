'use strict'
const AWS = require('aws-sdk');

AWS.config.update({region: "us-west-1"});

exports.handler = async (event, context) => {
    const ddb = new AWS.DynamoDB({apiVersion: "2012-10-08"});
    const documentClient = new AWS.DynamoDB.DocumentClient({region: "us-west-1"});

    let res = "";
    let statusCode = 0;

    const {firstName, lastName, userName} = JSON.parse(event.body);

    const params = {
        TableName: "Users",
        Item: {
            id: context.awsRequestId,
            firstName: firstName,
            lastName: lastName,
            userName: userName,
            projects: [
                {
                    pName: "project one",
                    goals: [
                        {
                            gName: "goal one",
                            gDesc: "goal one description",
                            subGoals: [
                                {
                                    subName: "subgoal one",
                                    subDesc: "subgoal one description",
                                    subGoals: [
                                        {},{},{}
                                        ]
                                }
                                ]
                        }
                        ]
                }
                ]
        }
    };


    try {
        const data = await documentClient.put(params).promise();
        res = JSON.stringify(data);
        statusCode = 201;

    } catch(err) {
        res =  "Unable to put user data";
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
