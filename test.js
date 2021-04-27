async function lol(){
    var {executeQuery} = require('./utils/database_query');
    var query = 'SELECT value FROM basic_variables WHERE name=\'itemValue\'';
    var response = await executeQuery(query, false);
    response = response['result'].replace('value\n', '');
    response = JSON.parse(response);
    console.log(response['blob'])

}

lol()