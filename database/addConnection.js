const AWS = require('aws-sdk');

const ddb = new AWS.DynamoDB.DocumentClient({ 
    apiVersion: '2012-08-10', 
    region: process.env.REGION
});

// const ddb = new AWS.DynamoDB.DocumentClient();

const baseStructure = {
    endUserId: '',
    domainId: '',
    connectionInfo: [],
    messages: [],
}

exports.addConnection = async (endUserId, domainId, connectionId) => {
    const TableName = process.env.END_USER_CHAT_TABLE;
    
    const res = await ddb.get({
        TableName,
        Key: { endUserId, domainId }
    })
    
    const Item = { ...baseStructure, ...res.Item, endUserId, connectionId, domainId };
    
    Item.connectionInfo.push({
        type: 'connected',
        connectionId,
        date: Date()
    })
    const params = {
      TableName,
      Item
    };
    
    try {
      await ddb.put(params).promise();
    } catch (error) {
      console.log('DB Error: ', error);
    }    
}