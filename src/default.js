export const handler = async (event) => {
    try {
        console.log('In default handler');
        console.log(event);
        console.log(JSON.parse(event.body).data, event.requestContext.connectionId);
    } catch (err) {
        return { statusCode: 500, body: 'Failed to Default: ' + JSON.stringify(err) };
    }
    return { statusCode: 200, body: 'Default :)' };
};