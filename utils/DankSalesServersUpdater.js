async function CallValues(client){
    var {executeQuery} = require('./database_query');
    var query = 'SELECT value FROM basic_variables WHERE name=\'dankSalesWebHooks\'';
    var response = await executeQuery(query, false);
    response = response['result'].replace('value\n', '');
    response = JSON.parse(response);
    client.DankSalesServers = response;
    console.log('DankSalesServers Updated!')
}

function UpdateDankSales(client) {
    CallValues(client);
    
}
module.exports = {
    UpdateDankSales
}