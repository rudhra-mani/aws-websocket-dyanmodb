const { removeConnection } = require('../database/removeConnection');

exports.handler = async (event) => {
    try {
        console.log('disconnect log', event);
        const { connectionId } = event.requestContext;
        // const { domainId, endUserId } = event.queryStringParameters;
        
        await removeConnection(connectionId);
        
        return { statusCode: 200, body: 'DisConnected :)' };
    } catch (err) {
        return { statusCode: 500, body: 'Failed to disconnect: ' + JSON.stringify(err) };
    }
};