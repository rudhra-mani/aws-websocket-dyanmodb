const AWS = require('aws-sdk')

const api = new AWS.ApiGatewayManagementApi({
  endpoint: '1gpplzg3l8.execute-api.us-east-1.amazonaws.com/dev'
})

const options = ['Yes', 'No', 'Maybe', 'Probably', 'Probably Not']

module.exports.handler = async (event) => {
    console.log('Message event:', event)
    
    console.log('Message from server', event.body);
    
    const connectionId = event.requestContext.connectionId
    
    await replyToMessage(options[Math.floor(Math.random() * options.length)], connectionId)
    return {
        statusCode: 200
    }
}

async function replyToMessage(response, connectionId) {
    const data = { message: response }
    const params = {
      ConnectionId: connectionId,
      Data: JSON.stringify(data)
    }
    return api.postToConnection(params).promise()
}