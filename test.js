var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000",
    accessKeyId: "accessKeyId",
    secretAccessKey: "secretAccessKey"
  });
  
var docClient = new AWS.DynamoDB.DocumentClient();

var params = {
    TableName: "Users",
    Key:{
        "UserID": "123456",
        "RefeID": 'Noti_123789_liked'
    }
};

docClient.delete(params, function(err, data) {
    if (err) {
        console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
    }
});