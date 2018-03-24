const fs = require('fs');
var queries = require('./queries.js');

module.exports = function loadparam() {
    return new Promise(function (resolve, reject) {
        // cleanup des tables avant reload
        var requests = queries.cleanup_tables.split(';');
        var promises = [];
        for (var i = 0; i < requests.length; i++) {
            if (requests[i].trim() !== '') {
                promises.push(gladys.utils.sql(requests[i] + ';'));
            }
        }

        Promise.all(promises)
            .then(() => {
                // load des parametres
                var param = JSON.parse(fs.readFileSync(__dirname + '/../param.json'));
                var values = [];

                for (var i = 0; i < param.schedule.length; i++)
                    values.push([param.schedule[i].day, param.schedule[i].special_day, param.schedule[i].start_time, param.schedule[i].start_time]);

                gladys.utils.sql(queries.insert_schedules, values)
                    .then(() => {
                        return resolve('success');
                    })
                    .catch((err) => {
                        return reject(new Error(err));
                    });
            })
            .catch((err) => {
                return reject(new Error(err));
            });
    });
}