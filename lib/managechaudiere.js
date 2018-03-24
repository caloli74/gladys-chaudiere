const fs = require('fs');
var queries = require('./queries.js');

module.exports = function managechaudiere() {
    return new Promise(function (resolve, reject) {
        var p1 = gladys.utils.sql(queries.get_current_target_temps);
        var p2 = gladys.deviceType.getByType({ type: 'temperature' });

        Promise.all([p1, p2])
            .then((result) => {
                for (i = 0; i < result[0].length; i++) {
                    console.log(result[0][i].room);
                    for (j = 0; j < result[1].length; j++) {
                        if (result[0][i].room === result[1][j].roomName) {
                            console.log(result[0][i].room + ': Temperature cible = ' + result[0][i].target_temp + ', temperature actuelle = ' + result[1][j].lastValue);
                        }
                    }
                }
                return resolve('success');
            })
            .catch((err) => {
                return reject(new Error(err));
            });
    });
}