var AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  endpoint: "http://localhost:8000",
  accessKeyId: "accessKeyId",
  secretAccessKey: "secretAccessKey"
});

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "Users",
    KeySchema: [       
        { AttributeName: "UserID", KeyType: "HASH"},  //Partition key
        { AttributeName: "RefeID", KeyType: "RANGE" }  //Sort key
    ],
    AttributeDefinitions: [       
        { AttributeName: "UserID", AttributeType: "S" },
        { AttributeName: "RefeID", AttributeType: "S" },
        { AttributeName: "Email", AttributeType: "S" }
    ],
    ProvisionedThroughput: {       
        ReadCapacityUnits: 10, 
        WriteCapacityUnits: 10
    },
    GlobalSecondaryIndexes: [ 
        { 
            IndexName: 'Email_Index', 
            KeySchema: [
                {
                    AttributeName: 'Email',
                    KeyType: 'HASH',
                }
            ],
            Projection: {
                ProjectionType: 'ALL'
            },
            ProvisionedThroughput: {
                ReadCapacityUnits: 10,
                WriteCapacityUnits: 10
            }
        }
    ]
};


dynamodb.createTable(params, function(err, data) {
    if (err) {
        console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
    } else {
        console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
    }
});
