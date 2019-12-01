var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000",
    accessKeyId: "accessKeyId",
    secretAccessKey: "secretAccessKey"
  });
  
var docClient = new AWS.DynamoDB.DocumentClient();

// 1. Get user information
var paramsUserInfo = {
    TableName : "Users",
    KeyConditionExpression: "UserID = :userid and RefeID = :reid",
    ExpressionAttributeValues: {
        ":reid": "123789",
        ":userid": "123789"
    }
};

// 2. Get all posts of user
var paramsUserPosts = {
    TableName : "Users",
    KeyConditionExpression: "UserID = :userid and begins_with(RefeID, :reid)",
    ExpressionAttributeValues: {
        ":reid": "Post_",
        ":userid": "123456"
    }
};

//3. Get all friend of user
var paramsUserFriends = {
    TableName : "Users",
    KeyConditionExpression: "UserID = :userid and begins_with(RefeID, :reid)",
    ExpressionAttributeValues: {
        ":reid": "Friend_",
        ":userid": "123456"
    }
};

//4. Get all notification belong to user
var paramsUserNoti = {
    TableName : "Users",
    KeyConditionExpression: "UserID = :userid and begins_with(RefeID, :reid)",
    ExpressionAttributeValues: {
        ":reid": "Noti_",
        ":userid": "123456"
    }
};

//5. Get all chats
var paramsUserChat = {
    TableName : "Users",
    KeyConditionExpression: "UserID = :userid and begins_with(RefeID, :reid)",
    ExpressionAttributeValues: {
        ":reid": "Chat_",
        ":userid": "123456"
    }
};

//6. Login by email
var paramsLogin = {
    TableName : "Users",
    IndexName: "Email_Index",
    KeyConditionExpression: "Email = :email",
    ExpressionAttributeValues: {
        ":email": "b@outlook.com"
    }
};

//7. Get all feeds (friend's posts)
var paramsFeed = {
    TableName : "Users",
    KeyConditionExpression: "UserID = :post",
    FilterExpression: "contains(Info.WhoCanSee, :id)",
    ExpressionAttributeValues: {
        ":post": "Post",
        ":id":"123457"
    }
}

//8. Get specific post
var paramsSpecificPost = {
    TableName : "Users",
    KeyConditionExpression: "UserID = :post and RefeID = :RefeID",
    FilterExpression: "contains(Info.WhoCanSee, :id)",
    ExpressionAttributeValues: {
        ":post": "Post",
        ":RefeID": "Post_TestDemo01",
        ":id":"123459"
    }
}


docClient.query(paramsSpecificPost, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            console.log(item);
        });
    }
});