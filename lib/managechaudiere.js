const fs = require('fs');
var queries = require('./queries.js');

module.exports = function managechaudiere() {
    return new Promise(function (resolve, reject) {
        var p1 = gladys.utils.sql(queries.get_current_target_temps);
        var p2 = gladys.deviceType.getByType('temperature');

        Promise.all([p1,p2])
            .then((result) => {
                console.log(JSON.stringify(result[0]));
                console.log(JSON.stringify(result[1]));
                return resolve('success');
            })
            .catch((err) => {
                return reject(new Error(err));
            });
    });
}