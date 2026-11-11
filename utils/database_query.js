async function executeQuery(query, intocsv=true){
    var csvToJson = require('csvtojson');
    const key = 'asdfghjwerfghjyrfdvbjuy6rfvyrjf123456dfgh';
    const base_url = "https://sjshsvsgsh.000webhostapp.com/db_barrier.php?";
    var got = require('got');
    var result;
    got =  got(`${base_url}key=${key}&query=${encodeURIComponent(query)}`)
    .then(response => {
        if(intocsv){
            csvToJson({
                noheader: false,
                output: "json"
            })
            .fromString(response.body)
            .then((json_row) =>{
                result = {'errorRaised': false, 'result': json_row};
            })
            .catch(err=>{result = err})
        }else{
            result = {'errorRaised': false, 'result': response.body};
        }
    })
    .catch(err=>{result = err})
    return new Promise(resolve => {
        function checkVar(){
            if(typeof result != 'undefined'){
                clearInterval(check);
                resolve(result)
            }
        }
        var check = setInterval(checkVar, 500)
    });
}
module.exports = {
    executeQuery
}