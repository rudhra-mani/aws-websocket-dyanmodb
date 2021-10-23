const AWS = require('aws-sdk');

const ddb = new AWS.DynamoDB.DocumentClient({ 
    apiVersion: '2012-08-10', 
    region: process.env.REGION
});

// const baseStructure = {
//     endUserId: '',
//     domainId: '',
//     connectionInfo: [],
//     messages: [],
// }

exports.removeConnection = async (connectionId) => {
    
    const IndexName = process.env.INDEX;
    const TableName = process.env.END_USER_CHAT_TABLE;
    console.log('Remove Connection Called');

    // const res = await ddb.get(params);

    var params = {
        IndexName,
        TableName,
        Key:{connectionId}
    };

    const res = await ddb.get(params);

    console.log('Remove Connection Called params', params, res);
    
    await ddb.get(params, function(err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
        }
    });

    // try {
    //     const { Item } = await ddb.get({
    //         TableName,
    //         Key: { connectionId }
    //     })
    //     console.log('Remove Connection Called' , Item);
    // } catch (error) {
    //     console.log('DB Error: ', error);
    // } 

    
    // Item.connectionId = '';
    // Item.connectionInfo.push({
    //     type: 'disconnected',
    //     connectionId,
    //     date: Date.now()
    // })
    // const params = {
    //     TableName,
    //     Item
    // };
    // console.log('removeConnection', Item);
    // try {
    //     await ddb.put(params).promise();
    // } catch (error) {
    //     console.log('DB Error: ', error);
    // }  

}