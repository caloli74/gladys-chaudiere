var fs = require('fs');
const SCRIPT_FILE = './create_db.sql';

module.exports = function install() {
    return new Promise(function (resolve, reject) {
        var script = fs.readFileSync(SCRIPT_FILE);
        console.log(script);
        var requests = script.split(';');
        for (var i = 0; i < requests.length; i++)
            console.log(requests[i]);
        //gladys.utils.sql(queries.create_tables);
        return resolve('success');
    });
}