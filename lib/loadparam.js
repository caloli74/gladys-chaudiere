const fs = require('fs');
var queries = require('./queries.js');

module.exports = function loadparam() {
    return new Promise(function (resolve, reject) {
        var i;

        // cleanup des tables avant reload
        var requests = queries.cleanup_tables.split(';');
        var promises = [];
        for (i = 0; i < requests.length; i++) {
            if (requests[i].trim() !== '') {
                promises.push(gladys.utils.sql(requests[i] + ';'));
            }
        }

        Promise.all(promises)
            .then(() => {
                // load des parametres
                var param = JSON.parse(fs.readFileSync(__dirname + '/../param.json'));
                
                var values = [];
                for (i = 0; i < param.schedule.length; i++)
                    values.push([param.schedule[i].day, param.schedule[i].special_day, param.schedule[i].start_time, param.schedule[i].stop_time]);
                var p1 = gladys.utils.sql(queries.insert_schedules, [values])

                values = [];
                for (i = 0; i < param.special_day.length; i++)
                    values.push([param.special_day[i].special_day, param.special_day[i].start_date, param.special_day[i].stop_date]);
                var p2 = gladys.utils.sql(queries.insert_special_days, [values])

                values = [];
                for (i = 0; i < param.target_temp.length; i++)
                    values.push([param.target_temp[i].room, param.target_temp[i].eco_temp, param.target_temp[i].comfort_temp]);
                var p3 = gladys.utils.sql(queries.insert_target_temps, [values])

                Promise.all([p1, p2, p3])
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