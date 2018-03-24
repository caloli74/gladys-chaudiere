const fs = require('fs');
var queries = require('./queries.js');

module.exports = function managechaudiere() {
    return new Promise(function (resolve, reject) {
        gladys.utils.sql(queries.get_current_target_temps)
            .then((target_temperatures) => {
                console.log(JSON.stringify(target_temperatures));
                return resolve('success');
            })
            .catch((err) => {
                return reject(new Error(err));
            });
    });
}