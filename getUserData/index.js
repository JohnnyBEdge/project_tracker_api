'use strict'
const AWS = require('aws-sdk');

AWS.config.update({region: "us-west-1"});

//handler is the fx being exported with index being the exported file
//takes 3 args by default: event- info that triggered the lambda; context- methods and props that provide
// information abvout the invocation, function and execution environment. 
exports.handler = function(event, context, callback){
    const ddb = new AWS.DynamoDB({apiVersion: "2012-10-08"});
    const params = {
        TableName: "Users",
        Key: {
            id: {
                S: "1234"
            }
        }
    }

    ddb.getItem(params, (err, data) => {
        if(err){
            console.log(err);
        }
        console.log(data);
    })
}