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
        "RefeID": "Post_TestDemo01"
    },
    UpdateExpression: "set Info.Liked = list_append(Info.Liked,:userid)",
    ExpressionAttributeValues:{
        ":userid": ["789456"]
    }
};

var paramsSpecificPost = {
    TableName : "Users",
    KeyConditionExpression: "UserID = :post and RefeID = :RefeID",
    ExpressionAttributeValues: {
        ":post": "Post",
        ":RefeID": "Post_TestDemo01"
    }
}

docClient.query(paramsSpecificPost, function(err, data) {
    if (err) {
        console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        var liked = data.Items[0].Info.Liked;
        liked.splice(liked.indexOf('123456'),1);
        console.log(liked);

        var paramsUpdate = {
            TableName:"Users",
            Key:{
                "UserID": "Post",
                "RefeID": "Post_TestDemo01"
            },
            UpdateExpression: "set Info.Liked = :newlist",
            ExpressionAttributeValues:{
                ":newlist": liked
            }
        };

        docClient.update(paramsUpdate, function(err, data) {
            if (err) {
                console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2));
            }
        });
    }
});