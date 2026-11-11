async function CallValues(client){
    var {executeQuery} = require('./database_query');
    var query = 'SELECT value FROM basic_variables WHERE name=\'itemValue\'';
    var response = await executeQuery(query, false);
    response = response['result'].replace('value\n', '');
    response = JSON.parse(response);
    client.itemValue = response;
}

function UpdateValue(client) {
    CallValues(client);
    
}
module.exports = {
    UpdateValue
}