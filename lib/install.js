var fs = require('fs');

module.exports = function install() {
    return new Promise(function (resolve, reject) {
        console.log('chaudiere');
        var script = fs.readFileSync('create_db.sql');
        console.log(script);
        var requests = script.split(';');
        for (var i = 0; i < requests.length; i++)
            console.log(requests[i]);
        //gladys.utils.sql(queries.create_tables);
        return resolve('success');
    });
}