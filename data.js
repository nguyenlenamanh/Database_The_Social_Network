var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000",
  accessKeyId: "accessKeyId",
  secretAccessKey: "secretAccessKey"
});

var docClient = new AWS.DynamoDB.DocumentClient();

var allUsers = JSON.parse(fs.readFileSync('data.json', 'utf8'));
allUsers.forEach(function(user) {
    var params = {
        TableName: "Users",
        Item: {
            "UserID":  user.UserID,
            "RefeID": user.RefeID,
            "Email": user.Info.Email,
            "Info":  user.Info
        }
    };

    docClient.put(params, function(err, data) {
       if (err) {
           console.error("Unable to add movie", user.UserID, ". Error JSON:", JSON.stringify(err, null, 2));
       } else {
           console.log("PutItem succeeded:", data);
       }
    });
});

