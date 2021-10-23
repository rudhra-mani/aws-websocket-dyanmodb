const { addConnection } = require('../database/addConnection');

exports.handler = async (event) => {
    try {
        console.log('connect log', event);

        const { connectionId } = event.requestContext;
        const { domainId, endUserId } = event.queryStringParameters;
    
        await addConnection(endUserId, domainId, connectionId);
        return { statusCode: 200, body: 'Connected :)' };
    } catch (err) {
        return { statusCode: 500, body: 'Failed to connect: ' + JSON.stringify(err) };
    }
};